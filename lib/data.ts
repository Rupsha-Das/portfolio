export const PROFILE = {
  name: "Rupsha Das",
  role: "Full-Stack Developer",
  tagline: "I build digital experiences that make technology feel unforgettable.",
  supporting:
    "I'm a Full-Stack Developer and builder working across web, AI/ML, embedded systems and creative technology — with a passion for building things people actually remember.",
  location: "Kolkata / Hyderabad / Internet",
  email: "dasrupsha2020@gmail.com",
  phone: "+91 90730 40582",
  phoneHref: "tel:+919073040582",
};

export const BIO_PIECES = [
  "I'm Rupsha Das, a Full-Stack Developer and builder who loves turning ideas into thoughtful, high-impact digital experiences.",
  "My work spans modern web development, AI/ML, embedded systems, and product building.",
  "And my curiosity goes beyond code — into creativity, community, content, and outreach.",
];

export type SocialLink = {
  platform: string;
  label: string;
  handle: string;
  url: string;
  cursor: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "GitHub",
    label: "GitHub",
    handle: "Rupsha-Das",
    url: "https://github.com/Rupsha-Das",
    cursor: "CODE →",
  },
  {
    platform: "LinkedIn",
    label: "LinkedIn",
    handle: "rupsha-das",
    url: "https://www.linkedin.com/in/rupsha-das-b6b5a8253/",
    cursor: "CONNECT →",
  },
  {
    platform: "Instagram",
    label: "Instagram",
    handle: "rupsha.py",
    url: "https://www.instagram.com/rupsha.py/",
    cursor: "FOLLOW →",
  },
  {
    platform: "X",
    label: "X",
    handle: "@das_rupsha18562",
    url: "https://x.com/das_rupsha18562",
    cursor: "FIND ME →",
  },
];

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const META_CHIPS = [
  "FULL-STACK",
  "AI / ML",
  "PRODUCT",
  "EMBEDDED",
  "CREATIVE TECH",
  "COMMUNITY",
];

export const DIMENSIONS = [
  { word: "FULL-STACK", color: "#D7FF3F", blurb: "React · Next.js · Node · TypeScript — IoT consoles serving 1,000+ devices in production.", visual: "code" },
  { word: "AI / ML", color: "#8B5CFF", blurb: "LLM assistants, telemetry diagnostics, YOLOv5n at the edge. Curious, not hype-drunk.", visual: "ai" },
  { word: "PRODUCT", color: "#F5F3EE", blurb: "Analytics dashboards, RBAC, OTA workflows, exports — the unsexy work that ships.", visual: "product" },
  { word: "EMBEDDED", color: "#7DEEFF", blurb: "ESP32-S3 · sensors · motor control · firmware under strict memory constraints.", visual: "hardware" },
  { word: "COMMUNITY", color: "#FF5C8A", blurb: "Hack4Bengal evangelist. Outreach, stages, rooms full of builders.", visual: "community" },
  { word: "CONTENT", color: "#D7FF3F", blurb: "Millions of views. I know why people stop scrolling.", visual: "content" },
] as const;

export const EXPERIENCE = [
  {
    id: "zedblox",
    index: "01",
    company: "ZedBlox",
    role: "Full-Stack Intern",
    location: "Hyderabad",
    period: "Aug 2025 — Jul 2026",
    color: "#D7FF3F",
    summary:
      "Built and deployed an LLM-powered Telemetry Analytics Assistant (OpenAI GPT + Google Gemini) for conversational shipment diagnostics, battery health analysis and anomaly detection — plus full-stack features for an IoT platform supporting 1,000+ connected medical devices.",
    bullets: [
      "1,000+ connected medical devices · React UIs, REST APIs, RBAC, OTP-protected OTA, activity logging",
      "Node.js + Express + MongoDB aggregation: −65% payloads, +92% query perf, −40% dashboard latency",
      "Unified telemetry across ActiPod & SafePod · stream-based CSV/PDF exports (−50% report time)",
    ],
    tags: ["React", "Next.js", "Node.js", "Express", "MongoDB", "OpenAI", "Gemini", "REST APIs", "RBAC"],
  },
  {
    id: "ieee",
    index: "02",
    company: "IEEE Computational Intelligence Society",
    role: "Embedded Systems Intern",
    location: "Kolkata",
    period: "Jun 2025 — Jul 2025",
    color: "#7DEEFF",
    summary:
      "Built an autonomous edge-AI vehicle on the ESP32-S3 using a quantized YOLOv5n model for real-time object detection and on-device navigation — firmware, vision, motors and radios under tight constraints.",
    bullets: [
      "Quantized YOLOv5n for real-time on-device detection + navigation",
      "Firmware integrating vision, motor control, sensor processing, wireless comms",
      "Sensor fusion: ultrasonic sensors + IR wheel encoders for avoidance & localization",
    ],
    tags: ["ESP32-S3", "YOLOv5n", "Computer Vision", "Edge AI", "Sensor Fusion", "Embedded C"],
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  hook: string;
  stats: { value: string; label: string }[];
  description: string;
  tags: string[];
  links: { demo?: string; github: string };
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    id: "sophistai",
    index: "01",
    title: "SophistAI",
    subtitle: "Personal Syllabus Navigator · sophistai.app",
    hook: "Turning a static syllabus into an interactive learning universe.",
    stats: [
      { value: "1ST / 200+", label: "Diversion 2k25 teams" },
      { value: "500+", label: "users" },
    ],
    description:
      "LLM-powered learning platform that processes syllabus PDFs into structured knowledge maps, topic hierarchies, prerequisite relationships and personalized learning paths — document understanding + retrieval workflows, NLP and prompt engineering.",
    tags: ["Next.js", "React", "TypeScript", "LLMs", "PDF processing", "Knowledge Graph"],
    links: { demo: "https://sophistai.app", github: "https://github.com/Rupsha-Das" },
    accent: "#D7FF3F",
  },
  {
    id: "manimate",
    index: "02",
    title: "Manimate",
    subtitle: "Agentic AI Education Platform",
    hook: "Topics in, narrated Manim videos out — agents all the way down.",
    stats: [
      { value: "AGENTIC", label: "lesson → video pipeline" },
      { value: "TTS+FX", label: "Kokoro · FFmpeg · quizzes" },
    ],
    description:
      "Next.js agentic AI platform transforming academic topics into structured lessons, narrated explanations and high-fidelity Manim videos — web research, multi-provider LLM generation, traceback-aware self-correction, Manim rendering, Kokoro TTS, FFmpeg stitching and AI quizzes.",
    tags: ["Next.js", "LLMs", "Manim", "Python", "FFmpeg", "Agentic AI"],
    links: { github: "https://github.com/Rupsha-Das/manimate" },
    accent: "#8B5CFF",
  },
  {
    id: "edusphere",
    index: "03",
    title: "EduSphere",
    subtitle: "Learning Platform",
    hook: "A full learning universe — playlists to leaderboards.",
    stats: [
      { value: "9+", label: "routes & flows" },
      { value: "R19+N16", label: "React 19 · Next.js 16" },
    ],
    description:
      "Polished learning-platform frontend — landing, playlist discovery, learner dashboard, video player, quiz flow, leaderboard, profile, progress tracking and an animated AI assistant, built on a reusable glassmorphism UI system.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Radix UI", "Framer Motion"],
    links: { github: "https://github.com/Rupsha-Das/Edusphere" },
    accent: "#7DEEFF",
  },
];

export const SKILLS = [
  { name: "JavaScript", group: "web" },
  { name: "TypeScript", group: "web" },
  { name: "React", group: "web" },
  { name: "Next.js", group: "web" },
  { name: "Redux", group: "web" },
  { name: "Tailwind CSS", group: "web" },
  { name: "Framer Motion", group: "web" },
  { name: "Radix UI", group: "web" },
  { name: "HTML", group: "web" },
  { name: "CSS", group: "web" },
  { name: "Node.js", group: "web" },
  { name: "Express.js", group: "web" },
  { name: "Python", group: "ml" },
  { name: "AI / ML", group: "ml" },
  { name: "OpenAI", group: "ml" },
  { name: "Gemini", group: "ml" },
  { name: "YOLOv5", group: "ml" },
  { name: "Edge AI", group: "edge" },
  { name: "ESP32-S3", group: "edge" },
  { name: "Django", group: "core" },
  { name: "Flask", group: "core" },
  { name: "Java", group: "core" },
  { name: "C++", group: "core" },
  { name: "C", group: "core" },
  { name: "SQL", group: "core" },
  { name: "MongoDB", group: "core" },
  { name: "MySQL", group: "core" },
  { name: "Docker", group: "tool" },
  { name: "AWS", group: "tool" },
  { name: "Git", group: "tool" },
  { name: "GitHub", group: "tool" },
  { name: "Figma", group: "tool" },
  { name: "FFmpeg", group: "tool" },
  { name: "Linux", group: "tool" },
];

export const SKILL_LINKS: [string, string][] = [
  ["React", "Next.js"],
  ["Next.js", "TypeScript"],
  ["TypeScript", "JavaScript"],
  ["Node.js", "Express.js"],
  ["Express.js", "MongoDB"],
  ["Python", "AI / ML"],
  ["AI / ML", "OpenAI"],
  ["OpenAI", "Gemini"],
  ["AI / ML", "YOLOv5"],
  ["YOLOv5", "Edge AI"],
  ["Edge AI", "ESP32-S3"],
  ["React", "Redux"],
  ["React", "Tailwind CSS"],
  ["Tailwind CSS", "Framer Motion"],
  ["Python", "Django"],
  ["Python", "Flask"],
  ["Docker", "AWS"],
  ["Git", "GitHub"],
];

export const ACHIEVEMENTS = [
  { value: 1, suffix: "st", label: "Diversion 2k25 — Winner", note: "1st of 200+ teams · SophistAI" },
  { value: 3, suffix: "rd", label: "Status Code 1 — Hardware track", note: "autonomy rig" },
  { value: 500, suffix: "+", label: "SophistAI users", note: "real people, real syllabi" },
  { value: 2, suffix: "M+", label: "Views / reach", note: "content, PR & outreach", isMillions: true },
];
