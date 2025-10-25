Cloudflare Worker: Contact Form Middleware
=========================================

This Worker receives POST requests from the website, exchanges OAuth credentials with Zoho, and sends an email to `alphafleet@desineuron.in`.

Endpoints
---------
- `POST /api/contact` with JSON `{ "email": string, "message": string }`

Response: `{ "success": true }` on success; `500` with `{ success: false, error }` on failure.

Setup
-----
1) Install Wrangler

    npm i -g wrangler

2) Configure secrets (never commit these):

    cd cf-worker
    wrangler secret put ZOHO_CLIENT_ID
    wrangler secret put ZOHO_CLIENT_SECRET
    wrangler secret put ZOHO_REFRESH_TOKEN

Optional (to skip an extra API call each request):

    wrangler secret put ZOHO_ACCOUNT_ID

If you are on a regional Zoho domain, set the region (defaults to `com`):

    # or set in wrangler.toml under [vars]
    wrangler secret put ZOHO_REGION

3) Deploy

    wrangler deploy

4) Note the deployed URL (e.g., `https://contact-worker.your-account.workers.dev`). Set it in the web app:

    VITE_CONTACT_API_URL=https://contact-worker.your-account.workers.dev/api/contact

Notes
-----
- Secrets are read at runtime by the Worker; no secrets are shipped in the front‑end.
- If `ZOHO_ACCOUNT_ID` is not set, the Worker fetches the first account with `GET /api/accounts`.

