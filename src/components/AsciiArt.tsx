import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

type AsciiArtProps = { disableRain?: boolean };

// Blocky DESINEURON LABS ASCII Art
const ASCII_LINES: string[] = [
  '██████╗ ███████╗███████╗██╗███╗   ██╗███████╗██╗   ██╗██████╗  ██████╗ ███╗   ██╗        ██╗      █████╗ ██████╗ ███████╗',
  '██╔══██╗██╔════╝██╔════╝██║████╗  ██║██╔════╝██║   ██║██╔══██╗██╔═══██╗████╗  ██║        ██║     ██╔══██╗██╔══██╗██╔════╝',
  '██║  ██║█████╗  ███████╗██║██╔██╗ ██║█████╗  ██║   ██║██████╔╝██║   ██║██╔██╗ ██║        ██║     ███████║██████╔╝███████╗',
  '██║  ██║██╔══╝  ╚════██║██║██║╚██╗██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██║╚██╗██║        ██║     ██╔══██║██╔══██╗╚════██║',
  '██████╔╝███████╗███████║██║██║ ╚████║███████╗╚██████╔╝██║  ██║╚██████╔╝██║ ╚████║        ███████╗██║  ██║██████╔╝███████║',
  '╚═════╝ ╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝        ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝'
];

// Indic character set for rain/glitch/morphing
const INDIC_CHAR_SET: string[] = [
  // Devanagari
  'अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','क','ख','ग','घ','च','छ','ज','झ','ट','ठ','ड','ढ','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह','।','ऽ',
  // Bengali/Assamese
  'অ','আ','ই','ঈ','উ','ঊ','এ','ঐ','ও','ঔ','ক','খ','গ','ঘ','চ','ছ','জ','ঝ','ট','ঠ','ড','ঢ','ত','থ','দ','ধ','ন','প','ফ','ব','ভ','ম','য','র','ল','শ','ষ','স','হ','ঃ','ঁ',
  // Gujarati
  'અ','આ','ઇ','ઈ','ઉ','ઊ','એ','ઐ','ઓ','ઔ','ક','ખ','ગ','ઘ','ચ','છ','જ','ઝ','ટ','ઠ','ડ','ઢ','ત','થ','દ','ધ','ન','પ','ફ','બ','ભ','મ','ય','ર','લ','વ','શ','ષ','સ','હ','ઃ',
  // Gurmukhi
  'ਅ','ਆ','ਇ','ਈ','ਉ','ਊ','ਏ','ਐ','ਓ','ਔ','ਕ','ਖ','ਗ','ਘ','ਚ','ਛ','ਜ','ਝ','ਟ','ਠ','ਡ','ਢ','ਤ','ਥ','ਦ','ਧ','ਨ','ਪ','ਫ','ਬ','ਭ','ਮ','ਯ','ਰ','ਲ','ਵ','ਸ਼','ਸ','ਹ','ੰ','ਃ',
  // Odia
  'ଅ','ଆ','ଇ','ଈ','ଉ','ଊ','ଏ','ଐ','ଓ','ଔ','କ','ଖ','ଗ','ଘ','ଚ','ଛ','ଜ','ଝ','ଟ','ଠ','ଡ','ଢ','ତ','ଥ','ଦ','ଧ','ନ','ପ','ଫ','ବ','ଭ','ମ','ଯ','ର','ଲ','ଶ','ଷ','ସ','ହ','ଃ',
  // Tamil
  'அ','ஆ','இ','ஈ','உ','ஊ','எ','ஏ','ஐ','ஒ','ஓ','ஔ','க்','ச','ஜ','ட','ண','த','ந','ப','ம','ய','ர','ல','வ','ள','ழ','ற','ன',
  // Telugu
  'అ','ఆ','ఇ','ఈ','ఉ','ఊ','ఎ','ఏ','ఐ','ఒ','ఓ','ఔ','క','ఖ','గ','ఘ','చ','ఛ','జ','ఝ','ట','ఠ','డ','ఢ','త','థ','ద','ధ','న','ప','ఫ','బ','భ','మ','య','ర','ల','వ','శ','ష','స','హ','ః',
  // Kannada
  'ಅ','ಆ','ಇ','ಈ','ಉ','ಊ','ಎ','ಏ','ಐ','ಒ','ಓ','ಔ','ಕ','ಖ','ಗ','ಘ','ಚ','ಛ','ಜ','ಝ','ಟ','ಠ','ಡ','ಢ','ತ','ಥ','ದ','ಧ','ನ','ಪ','ಫ','ಬ','ಭ','ಮ','ಯ','ರ','ಲ','ವ','ಶ','ಷ','ಸ','ಹ','ಃ',
  // Malayalam
  'അ','ആ','ഇ','ഈ','ഉ','ഊ','എ','ഏ','ഐ','ഒ','ഓ','ഔ','ക','ഖ','ഗ','ഘ','ച','ഛ','ജ','ഝ','ട','ഠ','ഡ','ഢ','ത','ഥ','ദ','ധ','ന','പ','ഫ','ബ','ഭ','മ','യ','ര','ല','വ','ശ','ഷ','സ','ഹ','ഃ',
  // Meetei Mayek (Manipuri)
  'ꯀ','ꯁ','ꯂ','ꯃ','ꯄ','ꯅ','ꯆ','ꯇ','ꯈ','ꯉ','ꯊ','ꯋ','ꯌ','ꯍ','ꯎ','ꯏ','ꯐ','ꯑ','ꯒ','ꯓ',
  // Santali (Ol Chiki)
  'ᱚ','ᱛ','ᱜ','ᱝ','ᱞ','ᱟ','ᱠ','ᱡ','ᱢ','ᱣ','ᱤ','ᱥ','ᱦ','ᱧ','ᱨ','ᱩ','ᱪ','ᱫ','ᱬ','ᱭ','ᱮ','ᱯ','ᱰ','ᱱ','ᱲ','ᱳ','ᱴ','ᱵ','ᱶ','ᱷ',
  // Urdu/Sindhi (Arabic script)
  'ا','آ','ب','پ','ت','ٹ','ث','ج','چ','ح','خ','د','ڈ','ذ','ر','ڑ','ز','ژ','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ک','گ','ل','م','ن','و','ہ','ء','ی','ے'
];

const AsciiArt: React.FC<AsciiArtProps> = () => {
  const baseChars = useMemo(() => ASCII_LINES.join('\n').split(''), []);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stopFlags = useRef<boolean[]>([]);

  // 0–4s: morph from Indic soup to final ASCII; 5s+: freeze
  useEffect(() => {
    const seeded = (i: number) => {
      const s = Math.sin(i * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    };
    const start = performance.now();
    const morph = setInterval(() => {
      const t = (performance.now() - start) / 1000;
      const spans = spanRefs.current;
      for (let i = 0; i < spans.length; i++) {
        const el = spans[i];
        if (!el) continue;
        const base = baseChars[i] ?? '';
        if (base === ' ' || base === '\n') { el.innerText = base; continue; }
        if (t < 4) {
          const threshold = seeded(i);
          if (t / 4 >= threshold) {
            el.innerText = base;
          } else {
            el.innerText = INDIC_CHAR_SET[Math.floor(Math.random() * INDIC_CHAR_SET.length)];
          }
        } else {
          el.innerText = base;
        }
      }
      if (t >= 5) clearInterval(morph);
    }, 30);
    return () => clearInterval(morph);
  }, [baseChars]);

  // Radial glitch on hover with clean reset
  const triggerRadialGlitch = (centerIndex: number) => {
    const centerEl = spanRefs.current[centerIndex];
    if (!centerEl) return;
    const c = centerEl.getBoundingClientRect();
    const neighbors: number[] = [];
    for (let i = 0; i < spanRefs.current.length; i++) {
      const el = spanRefs.current[i];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const dx = r.left + r.width / 2 - (c.left + c.width / 2);
      const dy = r.top + r.height / 2 - (c.top + c.height / 2);
      if (Math.hypot(dx, dy) <= 48) neighbors.push(i);
    }
    const picks = new Set<number>([centerIndex]);
    for (let k = 0; k < 6 && neighbors.length > 0; k++) {
      const pick = Math.floor(Math.random() * neighbors.length);
      picks.add(neighbors[pick]);
      neighbors.splice(pick, 1);
    }
    const flicker = (idx: number) => {
      const el = spanRefs.current[idx];
      if (!el) return;
      const duration = 200 + Math.random() * 120;
      const start = performance.now();
      let toggled = false;
      stopFlags.current[idx] = false;
      const tick = () => {
        const now = performance.now();
        if (stopFlags.current[idx] || now - start >= duration) {
          el.innerText = baseChars[idx] ?? '';
          return;
        }
        if (!toggled || Math.random() < 0.5) {
          toggled = !toggled;
          el.innerText = toggled
            ? INDIC_CHAR_SET[Math.floor(Math.random() * INDIC_CHAR_SET.length)]
            : baseChars[idx] ?? '';
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    picks.forEach(flicker);
  };

  // Render
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <motion.pre
        className="relative z-10 text-brand-red-hot text-center text-[10px] md:text-sm lg:text-base xl:text-lg font-mono whitespace-pre leading-[1.1em]"
        style={{ textShadow: '0 0 20px rgba(209, 0, 0, 0.8)' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        onMouseLeave={() => {
          const flags = stopFlags.current;
          for (let i = 0; i < spanRefs.current.length; i++) {
            flags[i] = true;
            const el = spanRefs.current[i];
            if (el) el.innerText = baseChars[i] ?? '';
          }
        }}
      >
        {useMemo(() => ASCII_LINES.join('\n').split(''), []).map((ch, i) => (
          <motion.span
            key={i}
            ref={(el) => (spanRefs.current[i] = el)}
            onMouseEnter={() => ch !== '\n' && ch !== ' ' && triggerRadialGlitch(i)}
            style={ch === '\n' ? { pointerEvents: 'none' } : undefined}
          >
            {ch}
          </motion.span>
        ))}
      </motion.pre>
    </div>
  );
};

export default AsciiArt;
