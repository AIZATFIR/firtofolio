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
    { name: "GitHub", handle: "@aizatfir", url: "https://github.com/aizatfir" },
    { name: "Vercel", handle: "aizatfir", url: "https://vercel.com/aizatfir" },
    { name: "Substack", handle: "@aizatfir", url: "https://substack.com/@aizatfir" },
    { name: "Instagram", handle: "@aizatfir", url: "https://instagram.com/aizatfir" },
    { name: "Email", handle: "aizatfir@gmail.com", url: "mailto:aizatfir@gmail.com" }
  ],
  currentlyBuilding: [
    { num: "01", title: "Focus Clock 2.0 (Circadian Intelligence & Audio Synthesis)", status: "Active" },
    { num: "02", title: "Distributed Mesh Audio Spatializer (Web Audio + MQTT)", status: "Active" },
    { num: "03", title: "Arabic Syntactic Dependency Graph Visualizer", status: "In Progress" },
    { num: "04", title: "Exploring Low-Latency WebAssembly & Real-time Systems", status: "Research" }
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
    readme: {
      repoName: "AIZATFIR / focus-clock",
      branch: "main",
      description: "Time-blocking analog clock app — Flutter + Riverpod + Isar + AI",
      sections: [
        {
          title: "🧠 The Science Behind It",
          points: [
            "**90-min Ultradian Rhythms**: Aligns work cycles with natural human attention peaks.",
            "**Intentional Rest**: Shifts brain from Task-Positive Network to Default Mode Network.",
            "**Circadian Energy Mapping**: Automatically syncs clock warmth to solar diurnal cycles."
          ]
        },
        {
          title: "🛠 Architecture & Tech Stack",
          points: [
            "**Flutter 3 & Dart 3**: Cross-platform web & mobile client with 60fps canvas dial.",
            "**Riverpod 2.6**: Unidirectional state machine and lifecycle event bus.",
            "**Isar Database**: High-speed NoSQL embedded offline storage.",
            "**AI Function Calling**: Structured JSON task decomposition."
          ]
        }
      ],
      buildSnippet: "git clone https://github.com/AIZATFIR/focus-clock.git\ncd focus-clock && flutter pub get\ndart run build_runner build\nflutter run -d chrome"
    }
  },
  {
    id: "rync432",
    number: "02",
    title: "RYNC432",
    tagline: "Ultra-low latency mesh audio synchronizer across distributed devices",
    category: "Distributed Systems & Audio",
    year: "2026",
    liveUrl: "https://rync432.vercel.app/",
    githubUrl: "https://github.com/aizatfir/rync432",
    technologies: ["Web Audio API", "MQTT PubSub", "Canvas 2D", "NTP Clock Sync", "TypeScript"],
    caseStudy: {
      problem: "Multi-room audio setups typically require expensive proprietary hardware or suffer severe Wi-Fi buffer drift.",
      approach: "Implemented lightweight NTP-style time offsets over WebSocket MQTT to synchronize Web Audio oscillators and audio buffers down to sub-10ms phase alignment.",
      architecture: "Decentralized room topology with master clock consensus and real-time frequency FFT visualizer.",
      result: "Zero-install spatial audio mesh running seamlessly inside modern browser tabs."
    }
  },
  {
    id: "qurabic",
    number: "03",
    title: "QURABIC (INDO)",
    tagline: "High-precision Arabic morphological NLP & root taxonomy corpus",
    category: "Linguistics NLP & Taxonomy",
    year: "2026",
    liveUrl: "https://qurabic-indo-corpus.vercel.app/",
    githubUrl: "https://github.com/aizatfir/qurabic-indo-corpus",
    technologies: ["Next.js 14", "TypeScript", "TailwindCSS", "Arabic NLP", "SQLite WASM"],
    caseStudy: {
      problem: "Navigating classical Arabic lemma roots and contextual semantic nuance in Indonesian translations lacks interactive graph tools.",
      approach: "Engineered a tri-literal root exploration engine that breaks down verse morphology into lemmas, pos-tags, and grammatical syntax trees.",
      architecture: "Client-side indexed lemma search with interactive syntactic highlighting and phoneme breakdown.",
      result: "Instant morphological lookup and root breakdown for researchers and learners."
    }
  },
  {
    id: "terraflow",
    number: "04",
    title: "TERRA FLOW",
    tagline: "Stoic decision engine converting complex dilemmas into executable ASTs",
    category: "Cognitive Architecture",
    year: "2026",
    liveUrl: "https://seamless-problem-solver.vercel.app/",
    githubUrl: "https://github.com/aizatfir/seamless-problem-solver",
    technologies: ["JavaScript ES6+", "TailwindCSS", "AST Flowchart", "Local Storage"],
    caseStudy: {
      problem: "Cognitive overwhelm and analysis paralysis during ambiguous architectural and life decisions.",
      approach: "Applied Dichotomy of Control heuristics to transform fuzzy problems into directed acyclic decision trees with probabilistic branch weighing.",
      architecture: "Interactive step-by-step flowchart evaluator with exportable markdown action plans.",
      result: "Structured clarity from chaos in under 3 minutes."
    }
  },
  {
    id: "social-affinity",
    number: "05",
    title: "SOCIAL AFFINITY",
    tagline: "Visual relationship orbit graphs based on Dunbar's cognitive layers",
    category: "Graph Visualization & Ergonomics",
    year: "2026",
    liveUrl: "https://social-affinity-network.vercel.app/",
    githubUrl: "https://github.com/aizatfir/social-affinity-network",
    technologies: ["JavaScript ES6+", "HTML5 Canvas", "Force-Directed Graph", "Dunbar Scale"],
    caseStudy: {
      problem: "Modern contact lists treat all connections as a flat infinite list, violating human Dunbar capacity limits.",
      approach: "Visualized personal social spheres as concentric gravitational orbits (Support Clique of 5, Sympathy Group of 15, Affinity Layer of 50).",
      architecture: "Physics-based collision-avoidance orbit simulation with recency decay algorithms.",
      result: "Mindful relationship maintenance without algorithmic feed addiction."
    }
  }
];

export const TOOLBOX = [
  {
    name: "Flutter / Dart",
    category: "Client Architecture",
    description: "60fps canvas rendering, Riverpod state machine, cross-platform compilation.",
    annotation: "Focus Clock core engine"
  },
  {
    name: "TypeScript / JS",
    category: "Languages",
    description: "Strict typing, functional composition, async streams, modern web APIs.",
    annotation: "Primary web language"
  },
  {
    name: "Python",
    category: "Systems & ML",
    description: "NLP tokenization, computer vision pipelines, automation scripts.",
    annotation: "Morphology & vision tooling"
  },
  {
    name: "Web Audio API",
    category: "Audio Engineering",
    description: "Synthesizer nodes, FFT analyzer, binaural spatialization, sample-accurate scheduling.",
    annotation: "RYNC432 audio mesh"
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
  },
  {
    title: "Hand Gesture Spatial Pointer",
    category: "Computer Vision",
    desc: "Webcam optical flow tracking finger velocity for air-mouse interaction.",
    tag: "CV Lab"
  }
];
