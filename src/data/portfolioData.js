/**
 * ZAFIR; Central Portfolio Data
 * Fullscreen Project Stories, Interactive Experiments, and Toolbox
 */

export const PORTFOLIO = {
  name: "ZAFIR;",
  fullName: "AIZAT FAHIM FIRMANSYAH",
  role: "Interactive Developer & Systems Builder",
  bio: "I build things I want to understand. Exploring software engineering, audio synchronization, cognitive ergonomics, and tactile interface craft.",
  email: "aizatfir@gmail.com",
  copyright: "© 2026 ZAFIR; — Built with curiosity & craft.",
  socials: [
    { name: "GitHub", handle: "@AIZATFIR", url: "https://github.com/AIZATFIR" },
    { name: "Vercel", handle: "aizatfir", url: "https://vercel.com/aizatfir" },
    { name: "Substack", handle: "@aizatfir", url: "https://substack.com/@aizatfir" },
    { name: "Instagram", handle: "@aizatfir", url: "https://instagram.com/aizatfir" },
    { name: "Email", handle: "aizatfir@gmail.com", url: "mailto:aizatfir@gmail.com" }
  ],
  currentlyBuilding: [
    { num: "01", title: "7Audio — Audiophile 5D Spatial Audio Engine", status: "Active" },
    { num: "02", title: "Fitrah Launcher — Digital Minimalism OS Workspace", status: "Active" },
    { num: "03", title: "Sadar — Conscious Habit Awareness Companion", status: "Active" },
    { num: "04", title: "Focus Clock 2.0 — Circadian Time-Blocking Engine", status: "Active" }
  ]
};

export const PROJECTS = [
  {
    id: "focus-clock",
    number: "01",
    title: "FOCUS CLOCK",
    tagline: "Time-blocking analog clock app — Flutter + Riverpod + Isar + AI",
    category: "Cognitive Ergonomics & AI",
    year: "2026",
    liveUrl: "https://focus-clock-web.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/focus-clock",
    technologies: ["Flutter 3", "Riverpod 2.6", "Isar DB", "OpenAI API", "WebAssembly", "Circadian UI"],
    caseStudy: {
      problem: "Traditional pomodoro timers disrupt deep cognitive flow by treating focus as mechanical slices rather than biological waves.",
      approach: "Built around 90-minute Ultradian cycles and Eisenhower matrix task mapping with circadian day/night color temperature shifting.",
      architecture: "Reactive unidirectional state management via Riverpod, local offline-first storage via Isar database, and LLM function calling.",
      result: "A distraction-free, analog-feel productivity tool that honors human cognitive rhythms."
    },
    deepDive: {
      summary: "Focus Clock rethinks human productivity around natural biological cycles rather than artificial 25-minute stopwatches. It features an interactive 24-hour analog dial where tasks are physical segments on the circumference.",
      highlights: [
        "90-Minute Ultradian Rhythms: Aligns deep work intervals with human attention peaks.",
        "Circadian Warmth Shift: UI color temperature subtly warms at sunset to prevent blue-light fatigue.",
        "Offline-First Isar DB: Zero-cloud latency with instant local persistence and encryption.",
        "AI Decomposition: Smart breakdowns convert ambiguous goals into discrete time blocks."
      ]
    }
  },
  {
    id: "7audio",
    number: "02",
    title: "7AUDIO",
    tagline: "Audiophile-grade 5D spatial audio player & binaural geometry engine",
    category: "Web Audio & Spatial Acoustics",
    year: "2026",
    liveUrl: "https://7audio.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/7Audio",
    technologies: ["Web Audio API", "HRTF Spatializer", "Vite + TypeScript", "Web Worker Clock", "Canvas 2D"],
    caseStudy: {
      problem: "Typical 8D audio tools rely on crude stereo panning and muddy reverbs that collapse phase integrity and muffle low frequencies.",
      approach: "Engineered a pristine 32-bit float Web Audio core with HRTF binaural spatialization, linear-phase 5-band crossover, and morphable continuous ribbon geometry.",
      architecture: "Decoupled audio synthesis driven by high-precision Web Worker clock, sub-bass center anchoring to prevent phase cancellation, and real-time interactive physics canvas.",
      result: "Crystal-clear holographic 3D soundstage rendering and lossless master-quality spatial WAV recording."
    },
    deepDive: {
      summary: "7Audio is an uncompromised 5D spatial audio engine built for producers, sound designers, and audiophiles who demand true binaural positioning without phase distortion.",
      highlights: [
        "32-Bit Float Lossless Pipeline: Uncompromised dynamic range supporting native hardware sample rates up to 192kHz.",
        "Sub-Bass Acoustic Anchoring: Keeps low-end frequencies centered to preserve punch while spreading harmonic layers across 3D space.",
        "Continuous Ribbon Source: Morphs sound sources seamlessly between point sources and wide acoustic ribbon arrays.",
        "Lossless Master WAV Export: Captures 32-bit float / 16-bit PCM uncompressed binaural stems in one click."
      ]
    }
  },
  {
    id: "fitrah-launcher",
    number: "03",
    title: "FITRAH LAUNCHER",
    tagline: "Distraction-free digital minimalism home launcher for Android, Linux & Windows",
    category: "Digital Minimalism & Systems",
    year: "2026",
    liveUrl: "https://github.com/AIZATFIR/Fitrah-Launcher/releases",
    githubUrl: "https://github.com/AIZATFIR/Fitrah-Launcher",
    technologies: ["Flutter 3", "Native Platform Channels", "Analog Dial Canvas", "Offline Storage"],
    caseStudy: {
      problem: "Modern mobile OS interfaces are engineered as dopamine extraction traps with high-saturation visual clutter, recommendation feeds, and red badge counters.",
      approach: "Redesigns device interaction into a calm 3-screen spatial model: Focus Clock Face (analog dial) + Fitrah Dashboard + Niagara-style Minimalist A-Z Drawer.",
      architecture: "Zero notification hooks, direct arc drag-to-plan time-blocking, haptic vertical A-Z alphabet scrubber, and 100% offline local privacy.",
      result: "Restores intentional computing and human fitrah, transforming smartphones from slot machines into serene instruments."
    },
    deepDive: {
      summary: "Fitrah Launcher replaces the chaotic mobile home screen with a unified spatial philosophy centered on human attention, intentional routine, and analog calm.",
      highlights: [
        "Spatial 3-Screen Architecture: Slide left for 24h/12h Focus Clock, center for Fitrah Dashboard, slide right for Minimal Drawer.",
        "Zero Notification Dots: Eliminates psychological triggers and compulsive notification checking.",
        "Direct Arc Drag-to-Plan: Interactive analog clock face for instant visual time-blocking.",
        "Cross-Platform Release: Native APK for Android alongside desktop Linux & Windows builds."
      ]
    }
  },
  {
    id: "sadar",
    number: "04",
    title: "SADAR",
    tagline: "Conscious habit awareness and daily fulfillment companion — Flutter",
    category: "Human Awareness & Philosophy",
    year: "2026",
    liveUrl: "https://github.com/AIZATFIR/Sadar/releases/latest",
    githubUrl: "https://github.com/AIZATFIR/Sadar",
    technologies: ["Flutter", "SQLite Persistence", "YPT Focus Engine", "Circadian UI"],
    caseStudy: {
      problem: "Traditional habit trackers obsess over fragile numerical streaks, inducing anxiety, guilt, and total abandonment when a streak breaks.",
      approach: "Built around 'Did I live today in a way I can be proud of?' Turns meaningful daily actions into visible accumulated evidence of mindful living.",
      architecture: "Offline-first Flutter engine with YPT-style lockscreen focus timer, flexible progression tracking, and reflective daily review journal.",
      result: "A serene, judgment-free personal companion for authentic self-awareness and conscious living."
    },
    deepDive: {
      summary: "Sadar is designed around conscious habit awareness rather than addictive gamification. It treats personal growth as continuous evidence of mindful practice.",
      highlights: [
        "Multi-Type Habit Engine: Timed focus mode with lockscreen whitelist, count tracking, and flexible body progression.",
        "7-Day Horizontal Timeline: 1-tap completion recording in under 5 seconds without friction.",
        "What I Repeat (Repetisi): Visual aggregations of real practiced identity over months.",
        "Reflection & Introspection: End-of-day mindfulness check-ins tracking emotional fulfillment."
      ]
    }
  },
  {
    id: "rync432",
    number: "05",
    title: "RYNC432",
    tagline: "Ultra-low latency mesh audio synchronizer across distributed devices",
    category: "Distributed Systems & Audio",
    year: "2026",
    liveUrl: "https://rync432.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/rync432",
    technologies: ["Web Audio API", "MQTT PubSub", "Canvas 2D", "NTP Clock Sync", "TypeScript"],
    caseStudy: {
      problem: "Multi-room audio setups typically require expensive proprietary hardware or suffer severe Wi-Fi buffer drift.",
      approach: "Implemented lightweight NTP-style time offsets over WebSocket MQTT to synchronize Web Audio oscillators and audio buffers down to sub-10ms phase alignment.",
      architecture: "Decentralized room topology with master clock consensus and real-time frequency FFT visualizer.",
      result: "Zero-install spatial audio mesh running seamlessly inside modern browser tabs."
    },
    deepDive: {
      summary: "RYNC432 turns any collection of browser tabs and smartphones into a synchronized multi-room audio mesh without requiring cables or proprietary hardware.",
      highlights: [
        "Sub-10ms Clock Sync: Microsecond NTP timestamp calibration over WebSocket MQTT.",
        "Real-Time FFT Visualizer: 60fps high-resolution spectral analysis rendered on HTML5 Canvas.",
        "Mesh Room Topology: Dynamically negotiates master/client clock consensus."
      ]
    }
  },
  {
    id: "qurabic",
    number: "06",
    title: "QURABIC (INDO)",
    tagline: "High-precision Arabic morphological NLP & root taxonomy corpus",
    category: "Linguistics NLP & Taxonomy",
    year: "2026",
    liveUrl: "https://qurabic-indo-corpus.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/qurabic-indo-corpus",
    technologies: ["Next.js 14", "TypeScript", "TailwindCSS", "Arabic NLP", "SQLite WASM"],
    caseStudy: {
      problem: "Navigating classical Arabic lemma roots and contextual semantic nuance in Indonesian translations lacks interactive graph tools.",
      approach: "Engineered a tri-literal root exploration engine that breaks down verse morphology into lemmas, pos-tags, and grammatical syntax trees.",
      architecture: "Client-side indexed lemma search with interactive syntactic highlighting and phoneme breakdown.",
      result: "Instant morphological lookup and root breakdown for researchers and learners."
    },
    deepDive: {
      summary: "Qurabic provides researchers and students with a high-precision morphological exploration tool for classical Arabic and Indonesian semantic nuance.",
      highlights: [
        "Tri-Literal Root Indexing: Interactive decomposition from root lemmas to derived grammatical forms.",
        "Zero-Latency Client Search: SQLite WASM engine running entirely in the user's browser.",
        "Visual Syntax Trees: Real-time morphological dependency highlighting."
      ]
    }
  },
  {
    id: "terraflow",
    number: "07",
    title: "TERRA FLOW",
    tagline: "Stoic decision engine converting complex dilemmas into executable ASTs",
    category: "Cognitive Architecture",
    year: "2026",
    liveUrl: "https://seamless-problem-solver.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/seamless-problem-solver",
    technologies: ["JavaScript ES6+", "TailwindCSS", "AST Flowchart", "Local Storage"],
    caseStudy: {
      problem: "Cognitive overwhelm and analysis paralysis during ambiguous architectural and life decisions.",
      approach: "Applied Dichotomy of Control heuristics to transform fuzzy problems into directed acyclic decision trees with probabilistic branch weighing.",
      architecture: "Interactive step-by-step flowchart evaluator with exportable markdown action plans.",
      result: "Structured clarity from chaos in under 3 minutes."
    },
    deepDive: {
      summary: "Terra Flow applies Stoic decision theory and directed acyclic graphs to break overwhelming dilemmas into clear, actionable decision steps.",
      highlights: [
        "Dichotomy of Control Filter: Separates controllable actions from external uncontrollable factors.",
        "Directed Acyclic Tree: Computes probabilistic paths and expected outcomes.",
        "Markdown Action Plans: Exports clear execution checklists directly to your workspace."
      ]
    }
  },
  {
    id: "social-affinity",
    number: "08",
    title: "SOCIAL AFFINITY",
    tagline: "Visual relationship orbit graphs based on Dunbar's cognitive layers",
    category: "Graph Visualization & Ergonomics",
    year: "2026",
    liveUrl: "https://social-affinity-network.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/social-affinity-network",
    technologies: ["JavaScript ES6+", "HTML5 Canvas", "Force-Directed Graph", "Dunbar Scale"],
    caseStudy: {
      problem: "Modern contact lists treat all connections as a flat infinite list, violating human Dunbar capacity limits.",
      approach: "Visualized personal social spheres as concentric gravitational orbits (Support Clique of 5, Sympathy Group of 15, Affinity Layer of 50).",
      architecture: "Physics-based collision-avoidance orbit simulation with recency decay algorithms.",
      result: "Mindful relationship maintenance without algorithmic feed addiction."
    },
    deepDive: {
      summary: "Social Affinity visualizes interpersonal relationships as gravitational orbits structured by Dunbar's cognitive numbers (5 / 15 / 50 / 150).",
      highlights: [
        "Dunbar Layer Orbits: Concentric visual rings representing true human emotional capacity.",
        "Physics Orbit Canvas: Interactive force-directed node simulation.",
        "Recency Decay: Highlights connections that need mindful intentional outreach."
      ]
    }
  }
];

export const TOOLBOX = [
  {
    name: "Flutter / Dart",
    category: "Client Architecture",
    description: "60fps canvas rendering, Riverpod state machine, cross-platform compilation.",
    annotation: "Focus Clock & Fitrah core"
  },
  {
    name: "TypeScript / JS",
    category: "Languages",
    description: "Strict typing, functional composition, async streams, modern web APIs.",
    annotation: "Primary web language"
  },
  {
    name: "Web Audio API",
    category: "Audio Engineering",
    description: "Synthesizer nodes, HRTF spatialization, 32-bit float pipeline, sub-bass anchoring.",
    annotation: "7Audio & RYNC432 engine"
  },
  {
    name: "Python",
    category: "Systems & ML",
    description: "NLP tokenization, computer vision pipelines, automation scripts.",
    annotation: "Morphology & vision tooling"
  },
  {
    name: "Svelte & React",
    category: "Reactive UI",
    description: "Fine-grained reactivity, component orchestration, motion systems.",
    annotation: "Interaction design"
  },
  {
    name: "GSAP & Motion",
    category: "Kinetic UI",
    description: "ScrollTrigger, kinetic typography, physics springs, SVG path draw.",
    annotation: "Motion infrastructure"
  },
  {
    name: "MQTT & WebSockets",
    category: "Real-time Sync",
    description: "Lightweight pub/sub protocols, low-latency device orchestration.",
    annotation: "Multi-device mesh"
  },
  {
    name: "Linux & Git",
    category: "Environment",
    description: "Bash scripting, terminal-first workflows, atomic version control.",
    annotation: "Daily workspace"
  }
];

export const EXPERIMENTS = [
  {
    title: "5D Spatial Ribbon Synth",
    category: "Web Audio",
    desc: "Binaural horizontal acoustic ribbon morphing with linear-phase 5-band crossover.",
    tag: "Audio Lab"
  },
  {
    title: "Circadian Warmth Shader",
    category: "GLSL / Canvas",
    desc: "Real-time sunlight rayleigh scattering simulator mapped to local longitude and solar altitude.",
    tag: "Prototype"
  },
  {
    title: "Binaural Phase Aligner",
    category: "Web Audio",
    desc: "Interactive 432Hz harmonic beat generator with microsecond stereo panning.",
    tag: "Audio Lab"
  },
  {
    title: "AST Flow Solver",
    category: "Logic Engine",
    desc: "Abstract syntax tree walker resolving complex dependency deadlocks.",
    tag: "Algorithm"
  }
];
