export interface Env {
  ZOHO_CLIENT_ID: string;
  ZOHO_CLIENT_SECRET: string;
  ZOHO_REFRESH_TOKEN?: string; // recommended in production
  ZOHO_REGION?: string; // com, in, eu, etc.
  ZOHO_ACCOUNT_ID?: string; // optional, avoids lookup
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function getAccessToken(env: Env): Promise<string> {
  const region = env.ZOHO_REGION || "com";
  const url = `https://accounts.zoho.${region}/oauth/v2/token`;

  if (!env.ZOHO_REFRESH_TOKEN) {
    throw new Error(
      "Missing ZOHO_REFRESH_TOKEN. Configure via `wrangler secret put ZOHO_REFRESH_TOKEN`."
    );
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: env.ZOHO_REFRESH_TOKEN,
    client_id: env.ZOHO_CLIENT_ID,
    client_secret: env.ZOHO_CLIENT_SECRET,
  });

  const res = await fetch(url, { method: "POST", body });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to obtain Zoho access token: ${res.status} ${text}`);
  }
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Zoho access token missing in response");
  return data.access_token;
}

async function getAccountId(env: Env, accessToken: string): Promise<string> {
  if (env.ZOHO_ACCOUNT_ID) return env.ZOHO_ACCOUNT_ID;
  const region = env.ZOHO_REGION || "com";
  const res = await fetch(`https://mail.zoho.${region}/api/accounts`, {
    headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch Zoho accounts: ${res.status} ${text}`);
  }
  const data = (await res.json()) as any;
  const first = data?.data?.accounts?.[0] ?? data?.accounts?.[0];
  const id = first?.accountId ?? first?.account_id ?? first?.id;
  if (!id) throw new Error("Zoho account id not found");
  return String(id);
}

async function sendZohoMail(
  env: Env,
  accessToken: string,
  accountId: string,
  to: string,
  subject: string,
  content: string
) {
  const region = env.ZOHO_REGION || "com";
  // Zoho Mail API expects multipart form data for sending messages
  const form = new FormData();
  form.set("toAddress", to);
  form.set("subject", subject);
  form.set("content", content);
  form.set("mailFormat", "html");

  const res = await fetch(
    `https://mail.zoho.${region}/api/accounts/${accountId}/messages`,
    {
      method: "POST",
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
      body: form,
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoho send mail failed: ${res.status} ${text}`);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method === "POST" && url.pathname === "/api/contact") {
      try {
        const body = (await request.json()) as { email?: string; message?: string };
        const email = (body.email || "").trim();
        const message = (body.message || "").trim();

        if (!isValidEmail(email) || message.length < 5) {
          return json({ success: false, error: "Invalid input" }, 400);
        }

        const token = await getAccessToken(env);
        const accountId = await getAccountId(env, token);

        const subject = "New Submission from the Alpha Fleet";
        const html = `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
            <h2>New Alpha Fleet Submission</h2>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
          </div>
        `;

        await sendZohoMail(env, token, accountId, "alphafleet@desineuron.in", subject, html);
        return json({ success: true });
      } catch (err: any) {
        return json({ success: false, error: String(err?.message || err) }, 500);
      }
    }

    return json({ error: "Not found" }, 404);
  },
} satisfies ExportedHandler<Env>;

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

