/**
 * Aizat Fahim Firmansyah's Real Deployed Projects & Engineering Showcase
 * Direct integrations with real Vercel deployments and GitHub repositories.
 */

export const featuredProjects = [
  {
    id: "focus-clock",
    title: "FOCUS CLOCK",
    tagline: "Flutter Web × Ambient Flow State × Circadian Time-Blocking",
    year: "2026",
    status: "Production / Live",
    badge: "PRIMARY FLAGSHIP",
    category: "Cognitive Companion & Deep Work",
    
    whatItIs: "AI-assisted time-blocking and flow state companion built with Flutter Web, engineered to sustain deep work with ambient acoustic cues and circadian rhythm cycles.",
    whyItExists: "Standard pomodoro timers are noisy and rigid. Focus Clock provides a calm, acoustic, unhurried time structure tailored to cognitive rhythm and frictionless focus.",
    whatAizatBuilt: "Architected the Flutter reactive state machine, built custom radial progress canvas shaders, integrated ambient acoustic cues with Web Audio, and deployed seamless web cross-platform runtime.",
    
    technologies: ["Flutter Web", "Dart", "Riverpod", "Isar DB", "AI Calling", "Vercel"],
    
    links: {
      live: "https://focus-clock-web.vercel.app/",
      embedUrl: "https://focus-clock-web.vercel.app/",
      github: "https://github.com/AIZATFIR/focus-clock",
      hasNativePreview: true,
      displayMode: "embed"
    },

    readme: {
      repoName: "AIZATFIR / focus-clock",
      branch: "main",
      stars: 0,
      description: "Time-blocking analog clock app — Flutter + Riverpod + Isar + AI",
      githubUrl: "https://github.com/AIZATFIR/focus-clock",
      sections: [
        {
          title: "🧠 The Science Behind It",
          points: [
            "**Ultradian rhythm** — the brain focuses in ~90-minute cycles. Deep Work blocks are capped at 90–120 minutes.",
            "**Intentional Rest** — after deep focus, the Default Mode Network consolidates memory. Schedules screen-free rest explicitly.",
            "**Sleep cycles** — sleep blocks are built in 90-minute multiples to avoid waking mid-cycle.",
            "**Circadian energy** — understands peak focus hours (07:00–11:00) and plans cognitive load accordingly."
          ]
        },
        {
          title: "🛠 Architecture & Tech Stack",
          points: [
            "**UI Layer**: Flutter 3 (Material 3 with custom CustomPaint radial clock face).",
            "**State Architecture**: Riverpod 2 reactive providers for uni-directional state flow.",
            "**On-Device Storage**: Isar database (embedded, ultra-fast zero-latency offline persistence).",
            "**AI Engine**: OpenAI-compatible function calling (Google AI / Groq / Ollama integration)."
          ]
        }
      ],
      buildSnippet: `git clone https://github.com/AIZATFIR/focus-clock\ncd focus-clock\nflutter pub get\ndart run build_runner build --delete-conflicting-outputs\nflutter run`
    }
  },
  {
    id: "rync432",
    title: "RYNC432 • AUDIO MESH",
    tagline: "Web Audio API × Real-Time Pub/Sub × Spatial Audio",
    year: "2026",
    status: "Production / Live",
    badge: "FEATURED",
    category: "Distributed Audio Synchronization",
    
    whatItIs: "Multi-device real-time audio synchronization platform that plays music across multiple phones, laptops, and tablets with zero lag and spatial channel separation.",
    whyItExists: "Physical multi-room speaker systems are expensive. RYNC432 turns any collection of browser devices into an ad-hoc synchronized surround sound mesh.",
    whatAizatBuilt: "Engineered the MQTT pub/sub sync bus, clock drift compensator (±1ms precision), spatial channel matrix (Stereo/Left/Right/Center), and Canvas audio visualizer.",
    
    technologies: ["Web Audio API", "MQTT Pub/Sub", "Canvas API", "JavaScript", "Vercel"],
    
    links: {
      live: "https://rync432.vercel.app/",
      embedUrl: "https://rync432.vercel.app/",
      github: "https://github.com/aizatfir/rync432",
      hasNativePreview: false,
      displayMode: "embed"
    }
  },
  {
    id: "qurabic-indo-corpus",
    title: "QURABIC (INDO)",
    tagline: "Next.js × Arabic Morphology × Corpus Explorer",
    year: "2026",
    status: "Production / Live",
    badge: "SYSTEMS",
    category: "Linguistics & Quranic Morphology",
    
    whatItIs: "A comprehensive Quranic Arabic Corpus and root word explorer in Bahasa Indonesia for in-depth etymology and grammatical analysis.",
    whyItExists: "Most Quranic Arabic morphological datasets are in English or raw database formats. Qurabic makes root word analysis accessible in Indonesian with clean UX.",
    whatAizatBuilt: "Developed the root word search engine (154+ roots, Fi'il/Isim forms), interactive word-by-word reading mushaf, and responsive Next.js frontend with bookpaper theming.",
    
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Arabic NLP AST", "Vercel"],
    
    links: {
      live: "https://qurabic-indo-corpus.vercel.app/",
      embedUrl: "https://qurabic-indo-corpus.vercel.app/",
      github: "https://github.com/aizatfir/qurabic-indo-corpus",
      hasNativePreview: false,
      displayMode: "embed"
    }
  },
  {
    id: "seamless-problem-solver",
    title: "TERRA FLOW",
    tagline: "Stoic Logic × Interactive Flowchart × Canvas Studio",
    year: "2025",
    status: "Production / Live",
    badge: "FLOW ENGINE",
    category: "Decision Systems & Mind Management",
    
    whatItIs: "Interactive decision flow engine and problem solver based on Stoic philosophy (Dichotomy of Control), featuring visual graph mapping and a flowchart creator studio.",
    whyItExists: "Helps users untangle overwhelming problems through structured decision nodes, 4-7-8 breathing relaxation, and guided clarity journaling.",
    whatAizatBuilt: "Built the reactive node canvas engine, custom JSON flowchart export/import mechanism, 4-7-8 breathing timer, and multi-mode player interface.",
    
    technologies: ["JavaScript", "TailwindCSS", "Vite", "Web Audio API", "Vercel"],
    
    links: {
      live: "https://seamless-problem-solver.vercel.app/",
      embedUrl: "https://seamless-problem-solver.vercel.app/",
      github: "https://github.com/aizatfir/seamless-problem-solver",
      hasNativePreview: false,
      displayMode: "embed"
    }
  },
  {
    id: "social-affinity-network",
    title: "SOCIAL AFFINITY NETWORK",
    tagline: "Dunbar Number × Social Orbits × Canvas Graphs",
    year: "2025",
    status: "Production / Live",
    badge: "VISUALIZATION",
    category: "Relational Dynamics & Network Viz",
    
    whatItIs: "Personal relationship and social orbit manager based on Dunbar's number to visualize intimate, close, family, and friend circles.",
    whyItExists: "Enables users to be intentional with their social energy and maintain meaningful relationships without cognitive overwhelm.",
    whatAizatBuilt: "Designed the interactive orbit canvas visualizer, category filter engine, and responsive relationship cards.",
    
    technologies: ["JavaScript", "TailwindCSS", "Plus Jakarta Sans", "Canvas API", "Vercel"],
    
    links: {
      live: "https://social-affinity-network.vercel.app/",
      embedUrl: "https://social-affinity-network.vercel.app/",
      github: "https://github.com/aizatfir/social-affinity-network",
      hasNativePreview: false,
      displayMode: "embed"
    }
  }
];

/**
 * Additional Real Repositories & Utilities
 */
export const additionalProjects = [
  {
    id: "firtoporio",
    title: "Aizat Fahim Portfolio",
    description: "Minimalist, high-craft personal portfolio built with Vanilla Honey Ice Cream Natural aesthetic and weighted inertia scrolling.",
    technology: "Vanilla JS / CSS / Vite",
    github: "https://github.com/aizatfir/Firtoporio",
    live: "https://firtofolio.vercel.app"
  }
];
