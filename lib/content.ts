/**
 * Canonical content source for the redesigned portfolio.
 *
 * Typed, centralized, presentation-free. Components render from here;
 * nothing here imports UI. Facts below come from the previous
 * `lib/data.ts` / resume record — no invented employers, metrics, or quotes.
 */

export const PROFILE = {
  name: "Rupsha Das",
  role: "Full-Stack Developer",
  oneLiner: "I build reliable software people actually enjoy using.",
  standpoints:
    "I work across web, AI-assisted products, and embedded systems — from React frontends to Node backends to on-device ML. I care about the unglamorous parts: predictable APIs, honest loading states, and software that behaves the same on day 200 as day 1.",
  location: "Kolkata · Hyderabad · Remote-friendly",
  availability: "Open to full-time roles & select freelance",
  email: "dasrupsha2020@gmail.com",
  phone: "+91 90730 40582",
  phoneHref: "tel:+919073040582",
} as const;

export type SocialLink = {
  platform: string;
  handle: string;
  url: string;
  blurb: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "GitHub",
    handle: "Rupsha-Das",
    url: "https://github.com/Rupsha-Das",
    blurb: "Code, experiments, works-in-progress",
  },
  {
    platform: "LinkedIn",
    handle: "rupsha-das",
    url: "https://www.linkedin.com/in/rupsha-das-b6b5a8253/",
    blurb: "Work history & recommendations welcome",
  },
  {
    platform: "Instagram",
    handle: "rupsha.py",
    url: "https://www.instagram.com/rupsha.py/",
    blurb: "Building in public, visual notes",
  },
  {
    platform: "X",
    handle: "@das_rupsha18562",
    url: "https://x.com/das_rupsha18562",
    blurb: "Short notes on shipping software",
  },
];

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/* ---------------- experience ---------------- */

export type ExperienceLink = { label: string; href: string };

export type Experience = {
  id: string;
  index: string;
  company: string;
  role: string;
  location: string;
  dates: string;
  summary: string;
  responsibilities: string[];
  impact: string[];
  stack: string[];
  links: ExperienceLink[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: "zedblox",
    index: "01",
    company: "ZedBlox",
    role: "Full-Stack Intern",
    location: "Hyderabad, India",
    dates: "Aug 2025 — Jul 2026",
    summary:
      "End-to-end product engineering on an IoT platform serving 1,000+ connected medical devices — admin and customer consoles, REST APIs, and an LLM-powered telemetry analytics assistant for conversational shipment diagnostics.",
    responsibilities: [
      "Built features across the Admin Console (dashboards, device management, RBAC, activity logging) and the Customer Console on a shared backend.",
      "Designed Node.js + Express + MongoDB aggregation endpoints behind paginated, filterable REST APIs.",
      "Added OTP-protected OTA update flows and stream-based CSV/PDF report exports.",
      "Prototyped conversational device analytics: query understanding, device context, and grounded answers over telemetry data.",
    ],
    impact: [
      "1,000+ connected medical devices served (ActiPod & SafePod telemetry unified).",
      "−65% API payload size and +92% query performance on key aggregation endpoints.",
      "−40% dashboard latency; −50% report-generation time via streaming exports.",
    ],
    stack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "OpenAI", "Gemini", "REST APIs", "RBAC"],
    links: [],
  },
  {
    id: "ieee-cis",
    index: "02",
    company: "IEEE Computational Intelligence Society",
    role: "Embedded Systems Intern",
    location: "Kolkata, India",
    dates: "Jun 2025 — Jul 2025",
    summary:
      "Built an autonomous edge-AI vehicle on the ESP32-S3: a quantized YOLOv5n model for real-time detection plus firmware tying together vision, motors, sensors, and radios under tight memory and power budgets.",
    responsibilities: [
      "Quantized and deployed YOLOv5n (int8) for real-time on-device object detection and navigation.",
      "Wrote firmware integrating camera inference, motor control, ultrasonic sensing, IR wheel encoders, and wireless comms.",
      "Tuned sensor fusion for obstacle avoidance and localization on constrained hardware.",
    ],
    impact: [
      "Real-time inference running on-device (no cloud round-trip for navigation decisions).",
      "Working autonomy demo: detect → avoid → re-localize loop on the competition rig.",
    ],
    stack: ["ESP32-S3", "YOLOv5n", "Computer Vision", "Edge AI", "Sensor Fusion", "Embedded C"],
    links: [],
  },
];

/* ---------------- projects & case studies ---------------- */

export type CaseSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  strapline: string;
  role: string;
  problem: string;
  outcome: string;
  stack: string[];
  accent: "moss" | "clay" | "ochre" | "skye";
  links: { demo?: string; github?: string };
  facts: { label: string; value: string }[];
  body: CaseSection[];
};

export const PROJECTS: Project[] = [
  {
    slug: "telemetry-assistant",
    index: "01",
    title: "Telemetry Analytics Assistant",
    strapline: "Conversational diagnostics over live IoT telemetry.",
    role: "Full-stack engineer — API design, data pipelines, assistant integration, admin UI.",
    problem:
      "Support and ops staff at an IoT platform had to read raw telemetry tables to answer simple questions: is this shipment healthy, which devices are anomalous, what drained this battery? The data existed; the answers were buried.",
    outcome:
      "An LLM-backed assistant (OpenAI GPT + Google Gemini) that answers shipment-health questions conversationally, grounded in live device context — alongside aggregation APIs that cut payloads by 65% and sped queries by 92%.",
    stack: ["Node.js", "Express", "MongoDB", "React", "OpenAI", "Gemini", "REST APIs"],
    accent: "moss",
    links: {},
    facts: [
      { label: "Devices in scope", value: "1,000+" },
      { label: "Payload reduction", value: "−65%" },
      { label: "Query speedup", value: "+92%" },
    ],
    body: [
      {
        heading: "Context & constraints",
        paragraphs: [
          "ZedBlox runs connected medical devices (ActiPod & SafePod) that stream telemetry continuously. Two consoles — admin and customer — share one backend. The team was small, the data volume large, and reliability non-negotiable: these are medical devices, so a wrong or hallucinated answer is worse than no answer.",
          "My constraint set: keep everything behind the existing auth model (RBAC + OTP-protected actions), don't balloon API payloads for low-bandwidth clients, and make the AI layer explainable — every answer traceable to real readings.",
        ],
      },
      {
        heading: "Reasoning & design decisions",
        paragraphs: [
          "I split the problem in two. First, the data layer: MongoDB aggregation pipelines that pre-shape telemetry (rollups, anomaly flags, battery-health series) so the API returns answers, not raw dumps. Routable pagination and synced filters mean the admin UI and the assistant query the same shaped endpoints.",
          "Second, the assistant layer: an LLM that receives structured device context (not free-form dumps) with strict instructions to cite readings and refuse when data is missing. GPT and Gemini were both wired so the team could compare cost, latency, and answer quality per query type.",
        ],
        bullets: [
          "Aggregation-first APIs: shape data in MongoDB, not in the browser — hence the −65% payloads.",
          "Shared endpoints for UI + assistant: one source of truth for 'what does healthy look like'.",
          "Grounded prompting with refusal behavior: no telemetry, no answer — an explicit 'I can't tell from available data'.",
          "RBAC enforced at the endpoint, not the UI: the assistant can never see devices the user can't.",
        ],
      },
      {
        heading: "Implementation notes",
        paragraphs: [
          "Express routes with validation middleware, MongoDB aggregation builders composed per filter set, and streaming CSV/PDF exports (Node streams, not buffered strings) so large reports don't spike memory. On the frontend, the analytics views share filter state via the URL — a report is a link you can send someone.",
          "Battery-health analysis and anomaly detection run as scheduled rollups, so conversational queries read precomputed series instead of scanning raw collections at chat speed.",
        ],
      },
      {
        heading: "Tradeoffs & what I'd improve",
        paragraphs: [
          "Dual-model support added genuine comparison value but doubled prompt-maintenance surface; in hindsight I'd have abstracted the provider behind one interface earlier. I'd also add evaluation harnesses — a fixed set of telemetry Q&A with expected readings — before expanding the assistant's scope, and cache hot rollups at the edge for the slowest dashboards.",
        ],
      },
    ],
  },
  {
    slug: "sophistai",
    index: "02",
    title: "SophistAI",
    strapline: "A static syllabus, rebuilt as an explorable knowledge map.",
    role: "Solo builder — product, frontend, AI integration, launch.",
    problem:
      "A syllabus is a list; learning is a graph. Students staring at a 40-page PDF can't see how topics connect, where to start, or what they're missing — so preparation becomes rote scrolling instead of structured exploration.",
    outcome:
      "An AI-powered syllabus navigator that turns an uploaded syllabus into an interactive knowledge map with contextual articles and progress tracking. Winner at Diversion 2k25 (1st of 200+ teams); 500+ real users.",
    stack: ["Next.js", "React", "AI APIs", "Interactive visualization"],
    accent: "clay",
    links: { demo: "https://sophistai.app/" },
    facts: [
      { label: "Hackathon result", value: "1st / 200+" },
      { label: "Real users", value: "500+" },
      { label: "Status", value: "Live" },
    ],
    body: [
      {
        heading: "Context & constraints",
        paragraphs: [
          "SophistAI started as a hackathon project with one unfair advantage: a sharp, narrow job-to-be-done. Not 'AI tutor for everything' — specifically, 'make my syllabus navigable'. Solo-built, so every scope decision had to survive contact with a 48-hour clock and, later, real users with real syllabi in messy formats.",
        ],
      },
      {
        heading: "Reasoning & design decisions",
        paragraphs: [
          "The core bet: the knowledge map is the product, chat is the accessory. Most study tools lead with a chatbot and bury structure; I inverted it. Upload a syllabus, get a visual graph of units and topics, then drill into any node for explanations and related concepts.",
          "I kept the AI's job small and verifiable — extract structure, explain nodes, suggest paths — rather than letting it free-form tutor. That keeps hallucinations bounded: a wrong explanation is visible next to the source topic, not hidden in a chat scroll.",
        ],
        bullets: [
          "Map-first, chat-second: structure is persistent and glanceable; conversation is contextual to a node.",
          "Progress tracking per topic so returning users see coverage, not just history.",
          "Messy-input tolerance: syllabi arrive as PDFs, photos, pasted text — parsing has to degrade gracefully.",
        ],
      },
      {
        heading: "Implementation notes",
        paragraphs: [
          "Next.js app with an interactive graph visualization, document parsing pipeline, and AI-assisted topic expansion. Performance mattered more than expected: graphs with 100+ nodes need virtualized rendering and restrained animation or mid-range phones choke. Reduced-motion users get the full map with zero animation — structure first, flourish never required.",
        ],
      },
      {
        heading: "Tradeoffs & what I'd improve",
        paragraphs: [
          "Depth beat breadth: I'd rather cover fewer syllabi formats excellently than many poorly. Next I'd add spaced-repetition scheduling tied to map nodes, offline-first caching for low-connectivity students, and an evaluation set of sample syllabi so parsing regressions get caught before users find them.",
        ],
      },
    ],
  },
  {
    slug: "edge-vehicle",
    index: "03",
    title: "Autonomous Edge-AI Vehicle",
    strapline: "Real-time detection and navigation on an ESP32-S3.",
    role: "Embedded intern — model deployment, firmware, sensor fusion.",
    problem:
      "Cloud-dependent robots stall when connectivity drops and can't react at camera frame-rate over a network round-trip. The challenge: fit real object detection and navigation onto a microcontroller with kilobytes to spare.",
    outcome:
      "A working autonomy rig: quantized YOLOv5n running on-device, fused with ultrasonic and encoder data for avoidance and localization. 3rd place, hardware track, Status Code 1.",
    stack: ["ESP32-S3", "YOLOv5n", "Embedded C", "Sensor Fusion"],
    accent: "skye",
    links: {},
    facts: [
      { label: "Inference", value: "On-device" },
      { label: "Model", value: "YOLOv5n int8" },
      { label: "Result", value: "3rd, hardware" },
    ],
    body: [
      {
        heading: "Context & constraints",
        paragraphs: [
          "Built during an embedded-systems internship with IEEE CIS: weeks, not months, on real hardware where every kilobyte and milliamp is accounted for. The ESP32-S3 has just enough headroom for a quantized vision model — if nothing else wastes it.",
        ],
      },
      {
        heading: "Reasoning & design decisions",
        paragraphs: [
          "Quantization was the whole game: YOLOv5n in int8 keeps detection usable while fitting memory. But a model alone isn't a vehicle — the firmware fuses vision output with ultrasonic range data and IR wheel-encoder odometry, so a missed detection doesn't mean a crash; the range sensor still vetoes forward motion.",
        ],
        bullets: [
          "Defense in depth: vision plans, ranging vetoes — no single sensor can command a collision.",
          "Fixed-point friendly math and preallocated buffers: no heap surprises mid-run.",
          "Wireless link reserved for telemetry and tuning, never in the control loop.",
        ],
      },
      {
        heading: "Implementation notes",
        paragraphs: [
          "Firmware in Embedded C tying camera inference, motor PWM, sensor interrupts, and radio into one deterministic loop. Tuning meant long sessions watching the rig misbehave: detection thresholds, avoidance hysteresis, and encoder calibration all interact, so I changed one variable at a time and logged everything.",
        ],
      },
      {
        heading: "Tradeoffs & what I'd improve",
        paragraphs: [
          "Int8 quantization costs accuracy on small or occluded objects — acceptable for obstacle classes, risky for fine categories. Next iteration: temporal smoothing across frames to kill flicker detections, plus a proper power budget with sleep states between inference bursts.",
        ],
      },
    ],
  },
  {
    slug: "veda-assessment",
    index: "04",
    title: "Veda Assessment",
    strapline: "Assessments designed for focus, not anxiety.",
    role: "Frontend builder — interaction design, assessment flow, responsive UI.",
    problem:
      "Most assessment UIs feel like interrogation software: cluttered, jittery, punitive. Test-takers split attention between the questions and the interface — and the interface always wins.",
    outcome:
      "A calm, responsive assessment platform with a clear question flow, honest progress, and zero interface friction between the candidate and the content.",
    stack: ["React", "JavaScript", "Responsive UI"],
    accent: "ochre",
    links: { demo: "https://veda-assessment.vercel.app/" },
    facts: [
      { label: "Feel", value: "Calm" },
      { label: "Layout", value: "Responsive" },
      { label: "Status", value: "Live" },
    ],
    body: [
      {
        heading: "Context & constraints",
        paragraphs: [
          "A self-directed build to explore a thesis: assessment software should lower cognitive load, not add to it. Single-page web app, no backend ceremony — the entire quality bar lives in the interaction details.",
        ],
      },
      {
        heading: "Reasoning & design decisions",
        paragraphs: [
          "Every choice serves focus: one question on screen, progress as a quiet bar rather than a countdown scream, generous touch targets, full keyboard operability. State transitions are instant — no spinners where none are needed — and nothing moves unexpectedly while reading.",
        ],
        bullets: [
          "Keyboard-first flow: tab order mirrors the test order; answers selectable without a mouse.",
          "Honest progress: position shown plainly, no dark patterns, no fake urgency.",
          "Readable at 320px and at desktop: fluid type, stacked actions, no clipped controls.",
        ],
      },
      {
        heading: "Tradeoffs & what I'd improve",
        paragraphs: [
          "It's a frontend without a backend story: real deployments need auth, anti-tamper timing, and result persistence. I'd add those behind the same calm UI, plus screen-reader announcements for question changes and a proper review-before-submit pass.",
        ],
      },
    ],
  },
];

/* ---------------- skills by capability ---------------- */

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  items: string[];
  footnote?: string;
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend engineering",
    blurb: "Interfaces that stay fast and readable on real devices.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Tailwind CSS", "Framer Motion", "Radix UI", "HTML", "CSS"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    blurb: "Small, honest services with predictable contracts.",
    items: ["Node.js", "Express.js", "REST APIs", "Python", "Django", "Flask", "RBAC & auth flows", "OTP-protected actions"],
  },
  {
    id: "data-cloud",
    title: "Databases & cloud",
    blurb: "Data shaped close to the store, shipped lean.",
    items: ["MongoDB", "Aggregation pipelines", "SQL", "MySQL", "Docker", "AWS", "Streaming exports (CSV/PDF)"],
  },
  {
    id: "ai",
    title: "AI-assisted products",
    blurb: "Models wired into products with grounding and refusal behavior.",
    items: ["LLM application design", "OpenAI", "Gemini", "Document intelligence", "Conversational analytics", "Computer vision", "YOLOv5", "TensorFlow"],
  },
  {
    id: "mobile-embedded",
    title: "Mobile & embedded",
    blurb: "Touch-first thinking; compute where the user is.",
    items: ["Mobile-first responsive web", "Touch & offline patterns", "ESP32-S3", "Edge AI", "Sensor fusion", "Embedded C"],
    footnote: "Native mobile apps are a current learning edge — the responsive/PWA instincts transfer.",
  },
  {
    id: "quality",
    title: "Testing, performance & observability",
    blurb: "The unglamorous parts that decide whether software survives contact with users.",
    items: ["Performance budgets", "Payload & query optimization", "Activity logging", "Analytics instrumentation", "Accessible QA (keyboard, SR, contrast)"],
  },
  {
    id: "product",
    title: "Product & collaboration",
    blurb: "How I work with people, not just code.",
    items: ["Product thinking", "UX writing", "Content & outreach", "Community building", "PR & launch basics", "Figma", "Git & GitHub", "Linux", "FFmpeg"],
  },
];

/* ---------------- proof (factual, from prior site) ---------------- */

export type Proof = { value: string; label: string; note: string };

export const PROOF: Proof[] = [
  { value: "1st", label: "Diversion 2k25 — Winner", note: "1st of 200+ teams · SophistAI" },
  { value: "3rd", label: "Status Code 1 — Hardware track", note: "Autonomy rig" },
  { value: "500+", label: "SophistAI users", note: "Real people, real syllabi" },
  { value: "2M+", label: "Content reach", note: "Building in public, PR & outreach" },
  { value: "1,000+", label: "Connected devices", note: "IoT telemetry in production" },
];

/* ---------------- social proof ----------------
 * No third-party quotes are on file, so none are invented here.
 * The section invites verifiable recommendations instead.
 */
export const SOCIAL_PROOF_NOTE = {
  heading: "References, not adjectives",
  body: "I haven't collected written testimonials yet — and I'd rather show you an empty shelf than a fabricated quote. The fastest reference check: talk to my collaborators on LinkedIn, or ask me for an intro to someone I've shipped with.",
  cta: { label: "Connect on LinkedIn", href: "https://www.linkedin.com/in/rupsha-das-b6b5a8253/" },
} as const;

/* ---------------- about page ---------------- */

export const ABOUT = {
  intro: [
    "I'm Rupsha — a full-stack developer who likes turning weird ideas into things people can actually use. My home turf is the web (React, Next.js, Node), but I've shipped AI-assisted products and even an autonomous edge-AI vehicle, because I learn fastest by building across the stack.",
    "I graduated with a B.Tech in Computer Science & Engineering (University of Kalyani, 2022–2026), and spent my internship years doing real production work: IoT telemetry for 1,000+ medical devices at ZedBlox, and embedded vision with IEEE CIS.",
  ],
  philosophy: [
    {
      title: "Reliability is a feature",
      body: "Software that works on demo day and breaks on day 30 is a failed demo with extra steps. I design for the boring days: predictable APIs, honest error states, and behavior that doesn't depend on perfect networks.",
    },
    {
      title: "Explain the why, not just the what",
      body: "Every technical decision in my case studies comes with its reasoning and tradeoffs. 'We used X' is trivia; 'we chose X over Y because…' is engineering.",
    },
    {
      title: "Small surface, deep quality",
      body: "I'd rather ship three flows that feel inevitable than thirty that feel generated. Constraint is a design tool.",
    },
  ],
  problems: [
    "Messy real-world data that needs to become legible answers (telemetry, documents, syllabi).",
    "Interfaces where calm matters — assessments, dashboards, diagnostics.",
    "Systems that must work on-device and offline, not just on fiber.",
    "Products where the AI must be grounded, cited, and willing to say 'I don't know'.",
  ],
  collaboration: [
    "I communicate in writing first: short RFCs, clear PR descriptions, honest status updates.",
    "I prefer small teams with direct user contact — the shorter the feedback loop, the better the product.",
    "I review code for readability over cleverness and leave codebases easier than I found them.",
  ],
  facts: [
    { k: "Degree", v: "B.Tech, Computer Science & Engineering (2022–2026)" },
    { k: "School", v: "University of Kalyani" },
    { k: "Home bases", v: "Kolkata · Hyderabad · remote-friendly" },
    { k: "Beyond code", v: "Content, community, outreach — 2M+ reach building in public" },
  ],
  rightNow: [
    "Hardening full-stack fundamentals: API design, Postgres-flavored data modeling, caching.",
    "Learning native mobile properly — the touch instincts are there, the platform depth is next.",
    "Writing more: turning build notes into case studies like the ones on this site.",
  ],
} as const;

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
