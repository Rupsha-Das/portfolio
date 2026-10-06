/**
 * Living-portrait configuration: expressions, dialogue, and the poke
 * state machine. Pure data — no UI, no timers. `LivingPortrait.tsx`
 * renders each feature (brows, eyes, mouth, blush, head tilt, hand)
 * as an independent layer driven by these values.
 */

export type ExpressionId =
  | "neutral"
  | "happy"
  | "curious"
  | "blushing"
  | "surprised"
  | "embarrassed"
  | "annoyed"
  | "lookingAway"
  | "coveringFace";

export type MouthId = "calm" | "smile" | "tilted" | "openSmall" | "frown" | "flat";

export type ExpressionVisual = {
  /** Human-readable label (live region + selector). */
  label: string;
  /** Both brows lift (px, negative = down). */
  browLift: number;
  /** Extra lift for the left brow only (curiosity). */
  browAsym: number;
  /** Inner-ends angle down (stern, degrees). */
  browStern: number;
  /** Eye openness multiplier (1 = natural). */
  eyeOpen: number;
  /** Larger catchlights for a brighter look. */
  bright: boolean;
  /** Closed lids instead of open eyes. */
  lidsClosed: boolean;
  /** Fixed gaze override; pupil-follow disabled while set. */
  gazeLock?: { x: number; y: number };
  mouth: MouthId;
  /** 0–1 blush opacity. */
  blush: number;
  /** Head/features tilt in degrees. */
  headTilt: number;
  /** Sweat drop accent. */
  sweat: boolean;
  /** Shy parasol prop covers the lower face. */
  umbrella: boolean;
};

export const EXPRESSIONS: Record<ExpressionId, ExpressionVisual> = {
  neutral: { label: "Calm", browLift: 0, browAsym: 0, browStern: 0, eyeOpen: 1, bright: false, lidsClosed: false, mouth: "calm", blush: 0.3, headTilt: 0, sweat: false, umbrella: false },
  happy: { label: "Happy", browLift: 1.5, browAsym: 0, browStern: 0, eyeOpen: 0.88, bright: true, lidsClosed: false, mouth: "smile", blush: 0.45, headTilt: 0, sweat: false, umbrella: false },
  curious: { label: "Curious", browLift: 2, browAsym: 4, browStern: 0, eyeOpen: 1.05, bright: true, lidsClosed: false, mouth: "tilted", blush: 0.3, headTilt: -3.5, sweat: false, umbrella: false },
  blushing: { label: "Blushing", browLift: -1, browAsym: 0, browStern: 0, eyeOpen: 0.92, bright: false, lidsClosed: false, mouth: "smile", blush: 0.85, headTilt: 2, sweat: false, umbrella: false },
  surprised: { label: "Surprised", browLift: 6, browAsym: 0, browStern: 0, eyeOpen: 1.28, bright: true, lidsClosed: false, mouth: "openSmall", blush: 0.35, headTilt: 0, sweat: true, umbrella: false },
  embarrassed: { label: "Embarrassed", browLift: -1, browAsym: 0, browStern: 0, eyeOpen: 0.9, bright: false, lidsClosed: false, mouth: "tilted", blush: 0.95, headTilt: 3, sweat: false, umbrella: false, gazeLock: { x: 4, y: 2.5 } },
  annoyed: { label: "Playfully annoyed", browLift: -2.5, browAsym: 0, browStern: 7, eyeOpen: 0.72, bright: false, lidsClosed: false, mouth: "frown", blush: 0.35, headTilt: 0, sweat: false, umbrella: false, gazeLock: { x: 5.5, y: 1 } },
  lookingAway: { label: "Looking away", browLift: 0, browAsym: 0, browStern: 0, eyeOpen: 0.95, bright: false, lidsClosed: false, mouth: "flat", blush: 0.4, headTilt: -2, sweat: false, umbrella: false, gazeLock: { x: -6, y: 0.5 } },
  coveringFace: { label: "Hiding", browLift: 1, browAsym: 0, browStern: 0, eyeOpen: 1, bright: false, lidsClosed: false, mouth: "smile", blush: 0.65, headTilt: 0, sweat: false, umbrella: true, gazeLock: { x: -5, y: 0 } },
};

export type PokeBeat = { expression: ExpressionId; message: string };

/**
 * Single controlled dialogue state. Exactly one of these may exist at a
 * time — a new message always REPLACES the previous one (new `id`), never
 * appends or layers on top of it.
 */
export type DialogueSource = "poke" | "theme" | "idle";
export type Dialogue = {
  id: number;
  text: string;
  source: DialogueSource;
};

/** Escalating script for pokes 1–15. Playful, teasing, harmless — never mean. */
export const POKE_SCRIPT: PokeBeat[] = [
  { expression: "happy", message: "hi :)" },
  { expression: "happy", message: "hello again" },
  { expression: "curious", message: "okay, I noticed" },
  { expression: "curious", message: "you found me" },
  { expression: "annoyed", message: "stop poking me" },
  { expression: "annoyed", message: "seriously?" },
  { expression: "annoyed", message: "I'm trying to work here" },
  { expression: "curious", message: "do you need something?" },
  { expression: "lookingAway", message: "you're very persistent" },
  { expression: "annoyed", message: "this is becoming a pattern" },
  { expression: "curious", message: "are you testing me?" },
  { expression: "embarrassed", message: "I'm running out of expressions" },
  { expression: "blushing", message: "wait… are you in love with me?" },
  { expression: "embarrassed", message: "or are you trying to flirt with me?" },
  { expression: "happy", message: "just admit you like the portrait" },
];

/** Controlled rotation once the script is exhausted (cycles by poke count). */
export const LATE_MOODS: PokeBeat[] = [
  { expression: "lookingAway", message: "You again?" },
  { expression: "blushing", message: "That is definitely flirting." },
  { expression: "blushing", message: "I'm starting to feel special." },
  { expression: "annoyed", message: "You really cannot leave me alone." },
  { expression: "embarrassed", message: "Okay, I'm blushing now." },
  { expression: "embarrassed", message: "Fine, one more poke." },
  { expression: "coveringFace", message: "fine — I'm hiding" },
  { expression: "lookingAway", message: "I'll be over here" },
  { expression: "happy", message: "This relationship is getting interactive." },
  { expression: "surprised", message: "hey!" },
];

/** Gentle first-notice on hover/focus — does not advance the poke counter. */
export const NOTICE_BEAT: PokeBeat = { expression: "curious", message: "oh — hello there" };

export const SMILE_BEAT: PokeBeat = { expression: "happy", message: "you got it" };

/** Expressions offered in the manual selector. */
export const SELECTABLE_EXPRESSIONS: ExpressionId[] = [
  "neutral",
  "happy",
  "curious",
  "surprised",
  "blushing",
];

/** Ms of quiet before the portrait eases back to calm. Counter is kept. */
export const CALM_DOWN_MS = 6000;

/** Minimum ms between accepted pokes — prevents broken states on rapid taps. */
export const POKE_THROTTLE_MS = 300;

export function beatForPoke(pokeCount: number): PokeBeat {
  if (pokeCount <= POKE_SCRIPT.length) return POKE_SCRIPT[pokeCount - 1];
  return LATE_MOODS[(pokeCount - POKE_SCRIPT.length - 1) % LATE_MOODS.length];
}

/** Playful theme-switch quips — controlled rotation, never annoying. */
export const THEME_QUIPS_DARK: PokeBeat[] = [
  { expression: "surprised", message: "Who turned out the lights?" },
  { expression: "curious", message: "Ah, we're going dark now." },
  { expression: "curious", message: "Very dramatic." },
  { expression: "happy", message: "Someone likes the night." },
  { expression: "curious", message: "I can still see you, you know." },
];

export const THEME_QUIPS_LIGHT: PokeBeat[] = [
  { expression: "surprised", message: "The sun has entered the chat." },
  { expression: "curious", message: "Oh, we're bright again." },
  { expression: "curious", message: "Good morning, apparently." },
  { expression: "happy", message: "Much better. I can see everything now." },
  { expression: "happy", message: "The light is back." },
];

/** Event name for theme changes so the portrait can react conversationally. */
export const THEME_QUIP_EVENT = "studio:theme-quip";

/** Lightweight theme signal — the portrait owns quip selection + dialogue. */
export type ThemeQuipDetail = { theme: "dark" | "light" };

/**
 * Compact variants for very narrow screens (<380px) so long lines stay
 * readable without widening the bubble. Same voice, fewer words.
 */
export const SHORT_DIALOGUE: Record<string, string> = {
  "The sun has entered the chat.": "Sun's back.",
  "Much better. I can see everything now.": "So bright now.",
  "Good morning, apparently.": "Morning, apparently.",
  "Oh, we're bright again.": "Bright again.",
  "I can still see you, you know.": "I still see you.",
  "wait… are you in love with me?": "In love with me?",
  "or are you trying to flirt with me?": "Flirting?",
  "I'm trying to work here": "I'm working.",
  "This relationship is getting interactive.": "So interactive.",
  "You really cannot leave me alone.": "Can't leave me alone.",
  "I'm starting to feel special.": "Feeling special.",
  "That is definitely flirting.": "Definitely flirting.",
  "I'm running out of expressions": "Out of expressions.",
  "this is becoming a pattern": "Becoming a pattern.",
  "just admit you like the portrait": "You like the portrait.",
};
