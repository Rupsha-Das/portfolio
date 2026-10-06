"use client";

import { useEffect, useRef, useState } from "react";
import { PortraitDialogue } from "./PortraitDialogue";
import {
  CALM_DOWN_MS,
  EXPRESSIONS,
  NOTICE_BEAT,
  POKE_THROTTLE_MS,
  SHORT_DIALOGUE,
  THEME_QUIPS_DARK,
  THEME_QUIPS_LIGHT,
  THEME_QUIP_EVENT,
  beatForPoke,
  type Dialogue,
  type DialogueSource,
  type ExpressionId,
  type MouthId,
  type PokeBeat,
  type ThemeQuipDetail,
} from "./portrait-config";

const SKIN = "#F3CFAC";
const SKIN_SHADE = "#DCA67E";
const HAIR = "#2A1C11";
const HAIR_STRAND = "#5C4225";
const HAIR_SHINE = "#7A5A33";
const LINE = "#3A2A1C";
const TOP = "#241D15";
const CLAY = "#B6461C";
const OCHRE = "#D9A441";
const BERRY = "#A2535C";
const BERRY_DARK = "#7C3A42";
const LIP_SEAM = "#5E2A32";
const BLUSH = "#D97B6C";
const IRIS = "#5E3418";
const BLUE = "#6FA8C9";

/* Lips share one outer shape family; seams and openings vary per mouth. */
function Mouth({ id }: { id: MouthId }) {
  const outer =
    id === "frown"
      ? "M154 216 C163 213 173 214 180 215 C187 214 197 213 206 216 C203 226 192 231 180 231 C168 231 157 226 154 216 Z"
      : id === "flat"
        ? "M154 216 C163 213 173 214 180 215 C187 214 197 213 206 216 C203 225 192 230 180 230 C168 230 157 225 154 216 Z"
        : "M153 215 C162 210 172 212 180 214 C188 212 198 210 207 215 C204 226 193 233 180 233 C167 233 156 226 153 215 Z";
  return (
    <g>
      <path d={outer} fill={BERRY} stroke={BERRY_DARK} strokeWidth="2" strokeLinejoin="round" />
      {id === "calm" && (
        <path d="M155 217 C166 221 194 221 205 217" fill="none" stroke={LIP_SEAM} strokeWidth="1.8" strokeLinecap="round" />
      )}
      {id === "smile" && (
        <path d="M154 216 C164 224 196 224 206 216" fill="none" stroke={LIP_SEAM} strokeWidth="2" strokeLinecap="round" />
      )}
      {id === "tilted" && (
        <path d="M155 217 C166 221 194 220 205 214" fill="none" stroke={LIP_SEAM} strokeWidth="1.8" strokeLinecap="round" />
      )}
      {id === "openSmall" && (
        <g>
          <ellipse cx="180" cy="224" rx="7" ry="9" fill="#6E2F38" stroke={LIP_SEAM} strokeWidth="2" />
          <ellipse cx="180" cy="228" rx="4" ry="3.2" fill="#D99A9A" />
        </g>
      )}
      {id === "frown" && (
        <path d="M156 218 C167 215 193 215 204 218" fill="none" stroke={LIP_SEAM} strokeWidth="2" strokeLinecap="round" />
      )}
      {id === "flat" && (
        <path d="M157 218 L203 217" fill="none" stroke={LIP_SEAM} strokeWidth="2" strokeLinecap="round" />
      )}
      {id !== "openSmall" && (
        <ellipse cx="180" cy="228" rx="9" ry="2.4" fill="#FFFFFF" opacity="0.3" />
      )}
    </g>
  );
}

function EyeWhite({ left }: { left: boolean }) {
  const d = left
    ? "M134 156 C139 148 159 148 164 156 C159 163 139 163 134 156 Z"
    : "M196 156 C201 148 221 148 226 156 C221 163 201 163 196 156 Z";
  return <path d={d} fill="#FFFDF9" stroke={LINE} strokeWidth="2" />;
}

function EyeLiner({ left }: { left: boolean }) {
  const lash = left
    ? "M133 155 C139 148 159 148 165 154"
    : "M227 155 C221 148 201 148 195 154";
  const wing = left ? "M165 154 L170 152" : "M195 154 L190 152";
  const lower = left
    ? "M143 162 C148 165 156 165 160 161"
    : "M217 162 C212 165 204 165 200 161";
  return (
    <g fill="none" stroke={LINE} strokeLinecap="round">
      <path d={lash} strokeWidth="3" />
      <path d={wing} strokeWidth="2.5" />
      <path d={lower} strokeWidth="1.2" opacity="0.45" />
    </g>
  );
}

/**
 * Living portrait — mini signature variant.
 *
 * Small editorial SVG portrait (head-focused crop) that lives beside the
 * hero name. No card, no controls, no counters. Poke state machine,
 * blush, hiding/umbrella prop, and calm-down timer are unchanged.
 *
 * All character dialogue — pokes, idle notices, and theme reactions —
 * flows through the single `dialogue` state rendered by the one
 * <PortraitDialogue /> bubble inside the local portrait wrapper.
 * Nothing is rendered near the header or theme toggle.
 */
export function LivingPortrait() {
  // Character state (expression) is separate from dialogue state.
  // Exactly ONE dialogue object exists at a time — every source (poke,
  // theme, idle notice) replaces it wholesale, so two messages can never
  // render or animate simultaneously.
  const [expression, setExpression] = useState<ExpressionId>("neutral");
  const [dialogue, setDialogue] = useState<Dialogue | null>(null);
  const [pokes, setPokes] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [visible, setVisible] = useState(true);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const figRef = useRef<HTMLDivElement | null>(null);
  const lastPokeAt = useRef(0);
  const gazeRaf = useRef(0);
  const darkIdx = useRef(-1);
  const lightIdx = useRef(-1);
  const lastThemeAt = useRef(0);
  // Monotonic id for the single dialogue slot — each new message gets the
  // next id, so React replaces (never stacks) the bubble.
  const dialogueId = useRef(0);
  // Backstop against true duplicates: same text re-issued within 150ms
  // (React Strict Mode double-effects, event bubbling, keydown+click
  // double-fire). Distinct messages always replace.
  const lastDialogueAt = useRef(0);
  const lastDialogueText = useRef("");
  // True on very narrow screens — long lines use compact variants.
  const compactDialogue = useRef(false);

  const visual = EXPRESSIONS[expression];

  /* Motion preference + pointer type (client-only, no hydration mismatch). */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pq = window.matchMedia("(pointer: fine)");
    const narrow = window.matchMedia("(max-width: 380px)");
    const sync = () => {
      setReduced(mq.matches);
      setFinePointer(pq.matches);
      compactDialogue.current = narrow.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    pq.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      pq.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  /* Pause everything when offscreen. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Blinking — idle and gentle. */
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!visible || document.hidden) return;
      setBlink(true);
      window.setTimeout(() => setBlink(false), 150);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduced, visible]);

  /* Occasional idle glance — subtle, infrequent. */
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!visible || document.hidden) return;
      if (expression !== "neutral" && expression !== "happy") return;
      setGaze({ x: 3.5, y: 0.5 });
      window.setTimeout(() => setGaze({ x: 0, y: 0 }), 900);
    }, 12000);
    return () => window.clearInterval(id);
  }, [reduced, visible, expression]);

  /* Ease back to calm after inactivity — expression resets, dialogue
     clears, counter stays. Re-created on every dialogue change, so a new
     message always cancels the previous reset timer. */
  useEffect(() => {
    if (expression === "neutral" && dialogue === null) return;
    const id = window.setTimeout(() => {
      setExpression("neutral");
      setDialogue(null);
    }, CALM_DOWN_MS);
    return () => window.clearTimeout(id);
  }, [expression, dialogue, pokes]);

  useEffect(() => () => window.cancelAnimationFrame(gazeRaf.current), []);

  /* Single shared dialogue updater — pokes, idle notices, and theme
     events all converge here and REPLACE the one dialogue slot, so only
     one bubble (one text layer) can ever exist. On very narrow screens
     long lines automatically use their compact variants. */
  const showBeat = (beat: PokeBeat, source: DialogueSource) => {
    const text =
      compactDialogue.current ? (SHORT_DIALOGUE[beat.message] ?? beat.message) : beat.message;
    const now = performance.now();
    if (text === lastDialogueText.current && now - lastDialogueAt.current < 150) return;
    lastDialogueAt.current = now;
    lastDialogueText.current = text;
    dialogueId.current += 1;
    setExpression(beat.expression);
    setDialogue({ id: dialogueId.current, text, source });
  };

  /* Theme-switch personality: the portrait owns quip selection, so the
     theme toggle stays visually clean and the line appears exactly once. */
  useEffect(() => {
    const onTheme = (e: Event) => {
      const detail = (e as CustomEvent<ThemeQuipDetail>).detail;
      if (!detail || (detail.theme !== "dark" && detail.theme !== "light")) return;
      // Guard against duplicate dispatches (bubbling / Strict Mode).
      const now = performance.now();
      if (now - lastThemeAt.current < 150) return;
      lastThemeAt.current = now;
      const pool = detail.theme === "dark" ? THEME_QUIPS_DARK : THEME_QUIPS_LIGHT;
      const idxRef = detail.theme === "dark" ? darkIdx : lightIdx;
      idxRef.current = (idxRef.current + 1) % pool.length;
      const beat = pool[idxRef.current] ?? pool[0];
      if (!beat) return;
      showBeat(beat, "theme");
    };
    window.addEventListener(THEME_QUIP_EVENT, onTheme);
    return () => window.removeEventListener(THEME_QUIP_EVENT, onTheme);
  }, []);

  const poke = () => {
    const now = performance.now();
    if (now - lastPokeAt.current < POKE_THROTTLE_MS) return;
    lastPokeAt.current = now;
    const n = pokes + 1;
    setPokes(n);
    showBeat(beatForPoke(n), "poke");
  };

  const notice = () => {
    if (dialogue !== null || expression !== "neutral") return;
    showBeat(NOTICE_BEAT, "idle");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!finePointer || reduced || !visible || visual.gazeLock) return;
    cancelAnimationFrame(gazeRaf.current);
    const el = figRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gazeRaf.current = requestAnimationFrame(() => {
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height * 0.4)) / r.height;
      setGaze({
        x: Math.max(-5, Math.min(5, dx * 14)),
        y: Math.max(-3, Math.min(3, dy * 9)),
      });
    });
  };

  const resetGaze = () => {
    cancelAnimationFrame(gazeRaf.current);
    setGaze({ x: 0, y: 0 });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      poke();
    }
  };

  const gx = visual.gazeLock ? visual.gazeLock.x : gaze.x;
  const gy = visual.gazeLock ? visual.gazeLock.y : gaze.y;
  const hl = visual.bright ? 2.4 : 1.7;
  const irisScale = Math.min(1, visual.eyeOpen);

  const eyeLayer = (left: boolean) => {
    const cx = left ? 149 : 211;
    const cy = 156;
    if (blink) {
      const d = left
        ? "M136 156 C142 160 156 160 162 155"
        : "M198 155 C204 160 218 160 224 156";
      return <path d={d} fill="none" stroke={LINE} strokeWidth="3" strokeLinecap="round" />;
    }
    return (
      <g transform={`translate(${cx} ${cy}) scale(1 ${visual.eyeOpen}) translate(${-cx} ${-cy})`}>
        <EyeWhite left={left} />
        <g transform={`translate(${gx} ${gy})`} className="portrait-pupils">
          <circle cx={cx} cy={cy + 1} r={6 * irisScale} fill={IRIS} />
          <circle cx={cx} cy={cy + 1} r={2.8 * irisScale} fill="#241307" />
          <circle cx={cx + 2} cy={cy - 1.5} r={hl} fill="#FFFFFF" />
          {visual.bright ? <circle cx={cx - 2.2} cy={cy + 2.5} r="1" fill="#FFFFFF" opacity="0.9" /> : null}
        </g>
        <EyeLiner left={left} />
      </g>
    );
  };

  return (
    <span
      ref={wrapRef}
      data-living-portrait
      className="hero-portrait portrait-wrapper"
    >
      {/* The single portrait-owned dialogue bubble — the only place the
          character speaks. Absolutely positioned to the local wrapper. */}
      <PortraitDialogue dialogue={dialogue} expressionLabel={visual.label} />

      <span ref={figRef} className="hero-portrait-fig" onPointerMove={onPointerMove} onPointerLeave={resetGaze}>
        <button
          type="button"
          onClick={poke}
          onMouseEnter={notice}
          onFocus={notice}
          onKeyDown={onKey}
          aria-label="Interactive portrait of Rupsha Das. Activate to say hi."
          className="hero-portrait-btn"
        >
          <svg viewBox="58 30 244 260" role="img" aria-hidden="true" className="hero-portrait-svg">
            <defs>
              <filter id="pSoftMini" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
              <clipPath id="pMiniClip">
                <path d="M48 425 L48 175 A132 128 0 0 1 312 175 L312 425 Z" />
              </clipPath>
            </defs>

            {/* backdrop plate */}
            <g clipPath="url(#pMiniClip)">
              <rect x="40" y="20" width="280" height="420" style={{ fill: "var(--paper-2)" }} />
              <path
                d="M48 425 L48 175 A132 128 0 0 1 312 175 L312 425 Z"
                style={{ fill: "var(--paper-2)", stroke: "var(--line-strong)" }}
                strokeWidth="2"
              />
            </g>
            <path
              d="M60 425 L60 180 A120 116 0 0 1 300 180 L300 425"
              fill="none"
              style={{ stroke: "var(--line-strong)" }}
              strokeWidth="2"
              strokeDasharray="2 7"
              strokeLinecap="round"
              opacity="0.55"
            />

            <g className={reduced ? undefined : "portrait-breathe"}>
              {/* back hair mass */}
              <path
                d="M180 40 C120 40 94 98 90 175 C86 255 80 335 90 412 C130 422 230 422 270 412 C280 335 274 255 270 175 C266 98 240 40 180 40 Z"
                fill={HAIR}
                stroke={LINE}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M104 200 C100 260 100 320 106 368" fill="none" stroke={HAIR_STRAND} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <path d="M256 200 C260 260 260 320 254 368" fill="none" stroke={HAIR_STRAND} strokeWidth="2" strokeLinecap="round" opacity="0.6" />

              {/* neck */}
              <path d="M153 232 L153 280 C153 290 207 290 207 280 L207 232 Z" fill={SKIN} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
              <ellipse cx="180" cy="240" rx="24" ry="6" fill={SKIN_SHADE} opacity="0.55" filter="url(#pSoftMini)" />

              {/* shoulders + arms (natural width) */}
              <path d="M118 440 C120 384 134 336 158 314 L202 314 C226 336 240 384 242 440 Z" fill={SKIN} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M118 440 C117 405 117 374 121 346 C105 353 94 371 90 396 C88 408 87 424 87 440 Z" fill={SKIN} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M242 440 C243 405 243 374 239 346 C255 353 266 371 270 396 C272 408 273 424 273 440 Z" fill={SKIN} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />

              {/* sleeveless top */}
              <path d="M112 440 C114 396 128 362 150 350 C164 357 196 357 210 350 C232 362 246 396 248 440 Z" fill={TOP} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M150 350 C164 358 196 358 210 350" fill="none" stroke="#0F0C09" strokeWidth="3" strokeLinecap="round" />

              {/* ears stay hidden under long hair; clay stud peeks through */}
              <circle cx="126" cy="184" r="2.6" fill={CLAY} stroke={LINE} strokeWidth="1.5" />

              {/* face — shorter, softly rounded, gently tapered jaw */}
              <path
                d="M180 70 C144 70 120 98 118 134 C116 168 124 196 138 216 C150 230 164 238 180 238 C196 238 210 230 222 216 C236 196 244 168 242 134 C240 98 216 70 180 70 Z"
                fill={SKIN}
                stroke={LINE}
                strokeWidth="2.5"
              />
              <ellipse cx="180" cy="102" rx="40" ry="24" fill="#FFFFFF" opacity="0.14" filter="url(#pSoftMini)" />
              <path d="M140 208 C152 227 166 236 180 236 C194 236 208 227 220 208" fill="none" stroke={SKIN_SHADE} strokeWidth="8" strokeLinecap="round" opacity="0.4" filter="url(#pSoftMini)" />

              {/* swept-back hair with a middle part */}
              <path
                d="M124 108 C126 80 150 58 180 58 C210 58 234 80 236 108 L228 108 C226 88 206 78 186 77 C184 77 182 77 180 80 C178 77 176 77 174 77 C154 78 134 88 132 108 Z"
                fill={HAIR}
                stroke={LINE}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M126 110 C118 168 114 243 108 310 C105 338 106 358 114 362 C124 336 128 248 136 150 Z" fill={HAIR} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M234 110 C242 168 246 243 252 310 C255 338 254 358 246 362 C236 336 232 248 224 150 Z" fill={HAIR} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M144 86 C134 122 131 158 133 192" fill="none" stroke={HAIR_SHINE} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
              {/* clay clip */}
              <g transform="rotate(-15 142 92)">
                <rect x="132" y="87" width="20" height="9" rx="4.5" fill={CLAY} stroke={LINE} strokeWidth="2" />
                <circle cx="138" cy="91.5" r="1.6" style={{ fill: "var(--paper)" }} />
                <circle cx="145" cy="91.5" r="1.6" style={{ fill: "var(--paper)" }} />
              </g>

              {/* features tilt together (curious / embarrassed) */}
              <g transform={`rotate(${visual.headTilt} 180 160)`}>
                {/* eyebrows */}
                <g transform={`translate(0 ${-visual.browLift})`}>
                  <g transform={`translate(0 ${-visual.browAsym}) rotate(${visual.browStern} 150 131)`}>
                    <path d="M133 133 C141 125 157 123 167 127" fill="none" stroke="#2E1C10" strokeWidth="4.5" strokeLinecap="round" />
                  </g>
                  <g transform={`rotate(${-visual.browStern} 210 131)`}>
                    <path d="M193 127 C203 123 219 125 227 133" fill="none" stroke="#2E1C10" strokeWidth="4.5" strokeLinecap="round" />
                  </g>
                </g>

                {/* eyes */}
                {eyeLayer(true)}
                {eyeLayer(false)}

                {/* nose */}
                <g fill="none" strokeLinecap="round">
                  <path d="M180 168 C179 178 178 185 176 191" stroke="#6B4A33" strokeWidth="2" opacity="0.8" />
                  <path d="M176 191 C172 194 167 195 164 193" stroke="#6B4A33" strokeWidth="2" opacity="0.8" />
                  <path d="M176 191 C180 194 185 195 188 193" stroke="#6B4A33" strokeWidth="2" opacity="0.8" />
                </g>

                {/* blush */}
                <ellipse cx="140" cy="193" rx="13" ry="7.5" fill={BLUSH} opacity={visual.blush} filter="url(#pSoftMini)" />
                <ellipse cx="220" cy="193" rx="13" ry="7.5" fill={BLUSH} opacity={visual.blush} filter="url(#pSoftMini)" />

                {/* mouth */}
                <Mouth id={visual.mouth} />

                {/* sweat accent */}
                {visual.sweat ? (
                  <path d="M238 122 C242 129 243 134 238 137 C233 134 234 129 238 122 Z" fill={BLUE} stroke={LINE} strokeWidth="1.5" />
                ) : null}

                {/* shy parasol */}
                {visual.umbrella ? (
                  <g transform="rotate(-8 180 228)">
                    <g className={reduced ? undefined : "umbrella-enter"}>
                      <path
                        d="M115 248 C115 220 145 204 180 204 C215 204 245 220 245 248 C238 241 230 241 224 248 C218 241 210 241 204 248 C198 241 190 241 184 248 C178 241 170 241 164 248 C158 241 150 241 144 248 C138 241 130 241 124 248 C120 244 117 246 115 248 Z"
                        fill={CLAY}
                        stroke={LINE}
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                      />
                      <g stroke="#8A3413" strokeWidth="2" opacity="0.7">
                        <path d="M180 206 L144 247" />
                        <path d="M180 206 L164 247" />
                        <path d="M180 206 L184 247" />
                        <path d="M180 206 L204 247" />
                        <path d="M180 206 L224 247" />
                      </g>
                      <circle cx="180" cy="201" r="4.5" fill={OCHRE} stroke={LINE} strokeWidth="2" />
                    </g>
                  </g>
                ) : null}
              </g>
            </g>
          </svg>
        </button>
      </span>
      <span id="portrait-hint" className="sr-only">
        Interactive. Activate to say hi.
      </span>
    </span>
  );
}
