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

export const META_CHIPS = ["FULL-STACK", "AI / ML"];

export type FocusWork = {
  title: string;
  org?: string;
  desc: string;
};

export type FocusArea = {
  id: string;
  word: string;
  color: string;
  intro: string[];
  techLabel: string;
  tech: string[];
  work: FocusWork[];
  visual: "fullstack" | "ai";
  signal: string;
  typingLine: string;
  statuses: string[];
};

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: "fullstack",
    word: "FULL-STACK",
    color: "#D7FF3F",
    intro: [
      "I build full-stack products from frontend to backend, turning ideas into real, usable experiences.",
      "At ZedBlox, I worked across both the Admin Console and Customer Console, building features, integrating APIs, improving performance, and handling end-to-end product development.",
      "From dashboards and management systems to customer-facing applications, I enjoy building products that are functional, scalable, and thoughtfully designed.",
    ],
    techLabel: "TECH STACK",
    tech: ["React", "Next.js", "TypeScript", "Node.js", "Python", "REST APIs", "MongoDB", "SQL"],
    work: [
      {
        title: "Admin Console",
        org: "ZedBlox",
        desc: "Built dashboards and management systems — features, API integrations, performance improvements, and end-to-end product development.",
      },
      {
        title: "Customer Console",
        org: "ZedBlox",
        desc: "Built customer-facing applications on the same backend — functional, scalable, and thoughtfully designed experiences.",
      },
    ],
    visual: "fullstack",
    signal: "SIGNAL // FULL-STACK",
    typingLine: "Admin → API → Customer · live.",
    statuses: ["ADMIN LIVE", "API ONLINE", "CUSTOMER LIVE"],
  },
  {
    id: "aiml",
    word: "AI / ML",
    color: "#7DEEFF",
    intro: [
      "I build AI-powered experiences that turn complex information into something people can actually use.",
      "From document intelligence and conversational analytics to computer vision and intelligent product features, I enjoy working where software meets machine learning.",
      "I focus on integrating models into real products — connecting AI with useful interfaces, reliable backend systems, and experiences that solve actual problems.",
    ],
    techLabel: "WHAT I WORK WITH",
    tech: [
      "Python",
      "Machine Learning",
      "Computer Vision",
      "LLM Applications",
      "AI APIs",
      "Document Intelligence",
      "TensorFlow",
      "YOLO",
      "MediaPipe",
    ],
    work: [
      {
        title: "SophistAI",
        desc: "An AI-powered Personal Syllabus Navigator that transforms a syllabus into an interactive learning experience with knowledge maps, contextual articles, and AI-assisted exploration.",
      },
      {
        title: "Device Analytics AI Assistant",
        org: "ZedBlox",
        desc: "Worked on AI assistant concepts for device analytics, including query understanding, device context, conversational analytics, and connecting AI capabilities with product workflows.",
      },
      {
        title: "Embedded ML",
        desc: "Worked with computer vision and on-device machine learning concepts using YOLOv5n, ESP32-S3, Raspberry Pi, and sensor-based systems.",
      },
    ],
    visual: "ai",
    signal: "SIGNAL // AI / ML",
    typingLine: "Turning information into intelligence.",
    statuses: ["MODEL READY", "INFERENCE ACTIVE", "DATA PROCESSED"],
  },
];

/** Kept for backwards-compat; WhoAmI now uses FOCUS_AREAS (FULL-STACK + AI/ML only). */
export const DIMENSIONS = FOCUS_AREAS.map((f) => ({
  word: f.word,
  color: f.color,
  blurb: f.intro[0],
  visual: f.visual,
})) as unknown as readonly [
  { word: string; color: string; blurb: string; visual: string },
  { word: string; color: string; blurb: string; visual: string },
];

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
  links: { demo?: string; github?: string };
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    id: "sophistai",
    index: "01",
    title: "SophistAI",
    subtitle: "AI Syllabus Navigator · sophistai.app",
    hook: "Turning a static syllabus into an interactive learning universe.",
    stats: [
      { value: "AI MAP", label: "interactive knowledge graph" },
      { value: "LIVE", label: "real users exploring" },
    ],
    description:
      "SophistAI is an AI-powered personal syllabus navigator that transforms a syllabus into an interactive knowledge map and helps users explore topics, track learning progress, and dive deeper into concepts.",
    tags: ["Next.js", "React", "AI/ML", "Interactive Learning"],
    links: { demo: "https://sophistai.app/" },
    accent: "#D7FF3F",
  },
  {
    id: "veda-assessment",
    index: "02",
    title: "Veda Assessment",
    subtitle: "Assessment Platform · Web Application",
    hook: "Clean, interactive assessments — built for focus and flow.",
    stats: [
      { value: "SMOOTH", label: "interactive assessment flow" },
      { value: "CLEAN", label: "modern responsive UI" },
    ],
    description:
      "Veda Assessment is a web-based assessment platform with a clean, interactive interface for conducting and managing assessments.",
    tags: ["React", "JavaScript", "Web Application"],
    links: { demo: "https://veda-assessment.vercel.app/" },
    accent: "#8B5CFF",
  },
  {
    id: "anime-project",
    index: "03",
    title: "Anime",
    subtitle: "Anime Music Experience · Interactive Themes",
    hook: "An immersive anime music experience where users can listen to anime songs and switch between atmospheric backgrounds and visual vibes.",
    stats: [
      { value: "MUSIC", label: "play · pause · skip" },
      { value: "VIBES", label: "dynamic backgrounds" },
    ],
    description:
      "Anime is an immersive anime-themed music experience for listening to anime songs directly on the site with play, pause, skip and music controls, plus switchable atmospheric backgrounds and visual themes — an interactive anime-inspired UI, not just a basic player.",
    tags: ["React", "Music Player", "Anime UI", "Interactive Themes", "Dynamic Backgrounds"],
    links: { demo: "https://anime-delta-ecru.vercel.app/" },
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
