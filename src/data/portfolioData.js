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
    { name: "Instagram", handle: "@zafirre", url: "https://www.instagram.com/zafirre/" },
    { name: "Email", handle: "aizatfir@gmail.com", url: "mailto:aizatfir@gmail.com" }
  ],
  currentlyBuilding: [
    { num: "01", title: "7Audio — Audiophile 5D Spatial Audio Engine", status: "Active" },
    { num: "02", title: "Focus Clock 2.0 — Circadian Time-Blocking Engine", status: "Active" },
    { num: "03", title: "Fitrah Launcher — Digital Minimalism OS Workspace", status: "Active" },
    { num: "04", title: "Sadar — Conscious Habit Awareness Companion", status: "Active" }
  ]
};

export const PROJECTS = [
  {
    id: "focus-clock",
    number: "01",
    title: "FOCUS CLOCK",
    tagline: {
      id: "Aplikasi jam analog penataan waktu fokus — Flutter + Riverpod + Isar + AI",
      en: "Time-blocking analog clock app — Flutter + Riverpod + Isar + AI"
    },
    category: "Cognitive Ergonomics & AI",
    year: "2026",
    liveUrl: "https://focus-clock-web.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/focus-clock",
    isNativeApp: false,
    caseStudy: {
      id: {
        problem: "Timer pomodoro biasa sering bikin frustrasi karena memaksakan fokus dalam potongan waktu 25 menit kaku, padahal konsentrasi manusia naik-turun secara alami.",
        approach: "Menggunakan ritme biologis Ultradian 90 menit dan jam analog 24 jam interaktif, ditambah penyesuaian suhu warna layar (circadian shift) saat malam hari.",
        architecture: "Dibangun dengan Flutter + Riverpod untuk state management, database lokal Isar tanpa cloud lag, dan integrasi AI untuk otomatis pecah target kerjaan jadi blok waktu.",
        result: "Alat produktivitas yang tenang, analog, dan menjaga energi otak tanpa bikin burnout."
      },
      en: {
        problem: "Rigid 25-minute Pomodoro timers break deep focus by forcing arbitrary stopwatches onto natural cognitive waves.",
        approach: "Designed around 90-minute Ultradian cycles and a 24-hour interactive analog dial with circadian color temperature shifting.",
        architecture: "Flutter engine with Riverpod state management, offline-first Isar database for zero latency, and LLM task decomposition.",
        result: "A calm, analog-feel focus companion that honors natural biological rhythms."
      }
    },
    deepDive: {
      id: {
        summary: "Focus Clock mendesain ulang produktivitas berbasis ritme alami tubuh manusia, bukan stopwatch buatan. Pekerjaan ditata langsung sebagai busur di lingkaran jam 24 jam.",
        highlights: [
          "Ritme Ultradian 90 Menit: Menyelaraskan waktu kerja dengan puncak fokus otak.",
          "Pergeseran Warna Sirkadian: Layar menghangat saat matahari terbenam untuk mengurangi kelelahan mata.",
          "Database Lokal Isar: 100% offline, instan, tanpa loading server.",
          "Dekomposisi AI: Memecah target besar menjadi jadwal blok waktu yang realistis."
        ]
      },
      en: {
        summary: "Focus Clock rethinks daily productivity around natural biological cycles. Tasks are plotted directly as physical arcs on a 24-hour analog dial.",
        highlights: [
          "90-Minute Ultradian Cycles: Aligns deep work intervals with human attention peaks.",
          "Circadian Warmth Shift: UI warms at sunset to prevent eye fatigue.",
          "Offline-First Isar DB: Zero latency with instant local storage.",
          "AI Goal Breakdown: Converts ambiguous goals into actionable time blocks."
        ]
      }
    }
  },
  {
    id: "7audio",
    number: "02",
    title: "7AUDIO",
    tagline: {
      id: "Pemutar audio spasial 5D kualitas audiophile & mesin akustik binaural",
      en: "Audiophile-grade 5D spatial audio player & binaural geometry engine"
    },
    category: "Web Audio & Spatial Acoustics",
    year: "2026",
    liveUrl: "https://7audio.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/7Audio",
    isNativeApp: false,
    caseStudy: {
      id: {
        problem: "Efek audio 8D biasa cuma pakai stereo panning murahan dan reverb tebal yang merusak kejernihan suara dan bikin bass jadi mendem.",
        approach: "Membuat engine spatial audio binaural HRTF murni dengan pemisahan 5-band crossover dan ribbon geometry interaktif di atas kanvas 3D.",
        architecture: "Pipeline 32-bit float Web Audio API, Web Worker audio clock berpresisi tinggi, sub-bass center anchoring agar frekuensi rendah tetap solid dan tidak pecah.",
        result: "Ruang dengar 3D yang sangat jernih seperti ada di panggung konser langsung, bisa diekspor ke format WAV master lossless."
      },
      en: {
        problem: "Typical 8D audio tools rely on crude stereo panning and muddy reverbs that collapse audio clarity and muffle low frequencies.",
        approach: "Engineered a pristine 32-bit float Web Audio core with HRTF binaural spatialization, 5-band crossover, and interactive 3D ribbon geometry.",
        architecture: "High-precision Web Worker clock, sub-bass center anchoring to prevent phase issues, and real-time canvas visualizer.",
        result: "Crystal-clear holographic 3D soundstage with instant lossless master WAV recording export."
      }
    },
    deepDive: {
      id: {
        summary: "7Audio dibuat untuk penikmat audio dan produser musik yang menginginkan penempatan suara 3D binaural sejati tanpa penurunan kualitas audio.",
        highlights: [
          "Pipeline 32-Bit Float: Rentang dinamika suara penuh tanpa distorsi hingga 192kHz.",
          "Sub-Bass Center Anchoring: Frekuensi rendah tetap di tengah agar hentakan bass tetap bertenaga.",
          "Ribbon Acoustic Morphing: Mengubah sumber suara dari titik tunggal menjadi susunan pita suara lebar.",
          "Ekspor Master Lossless: Merekam hasil spatialisasi ke WAV 32-bit float dalam satu klik."
        ]
      },
      en: {
        summary: "7Audio is a 5D spatial audio engine built for audiophiles who demand true binaural positioning without phase cancellation.",
        highlights: [
          "32-Bit Float Pipeline: Lossless dynamic range supporting sample rates up to 192kHz.",
          "Sub-Bass Anchoring: Keeps low-end frequencies centered to preserve punch.",
          "Acoustic Ribbon Array: Morphs sound sources from single points to wide spatial ribbons.",
          "Lossless WAV Export: One-click uncompressed master export."
        ]
      }
    }
  },
  {
    id: "rync432",
    number: "03",
    title: "RYNC432",
    tagline: {
      id: "Sinkronisasi audio multi-perangkat real-time berlatensi ultra rendah",
      en: "Ultra-low latency mesh audio synchronizer across distributed devices"
    },
    category: "Distributed Systems & Audio",
    year: "2026",
    liveUrl: "https://rync432.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/rync432",
    isNativeApp: false,
    caseStudy: {
      id: {
        problem: "Sistem audio multi-ruangan biasanya butuh perangkat mahal atau sering delay/tidak selaras saat diputar lewat jaringan Wi-Fi biasa.",
        approach: "Memakai kalibrasi waktu bergaya NTP via WebSocket MQTT untuk menyinkronkan oscillator Web Audio di banyak HP dan laptop sekaligus.",
        architecture: "Topologi mesh terdesentralisasi dengan konsensus master clock dan visualizer spektrum frekuensi FFT real-time pada nada 432Hz.",
        result: "Bisa memutar musik serentak di berbagai perangkat browser tanpa perlu instal aplikasi apapun, selaras di bawah 10ms."
      },
      en: {
        problem: "Multi-room audio setups typically require expensive proprietary hardware or suffer severe Wi-Fi audio latency drift.",
        approach: "Implemented lightweight NTP-style time offsets over WebSocket MQTT to synchronize Web Audio buffers across distributed devices.",
        architecture: "Decentralized mesh topology with master clock consensus and real-time 432Hz FFT spectral visualizer.",
        result: "Zero-install spatial audio mesh running across browser tabs with sub-10ms synchronization."
      }
    },
    deepDive: {
      id: {
        summary: "RYNC432 menyulap beberapa HP dan laptop di satu ruangan menjadi sistem speaker surround tersinkronisasi tanpa kabel.",
        highlights: [
          "Sinkronisasi Sub-10ms: Kalibrasi waktu mikrodetik lewat WebSocket.",
          "Visualizer FFT 60fps: Analisis spektrum frekuensi audio di kanvas HTML5.",
          "Topologi Mesh: Penentuan master clock otomatis antar perangkat."
        ]
      },
      en: {
        summary: "RYNC432 turns any collection of browser tabs and smartphones into a synchronized multi-room sound system without extra hardware.",
        highlights: [
          "Sub-10ms Clock Sync: Microsecond timestamp calibration over WebSocket.",
          "Real-Time FFT Visualizer: 60fps high-resolution spectral analysis on Canvas.",
          "Mesh Topology: Automated master/client clock consensus."
        ]
      }
    }
  },
  {
    id: "qurabic",
    number: "04",
    title: "QURABIC (INDO)",
    tagline: {
      id: "Korpus morfologi & taksonomi akar kata bahasa Arab presisi tinggi",
      en: "High-precision Arabic morphological NLP & root taxonomy corpus"
    },
    category: "Linguistics NLP & Taxonomy",
    year: "2026",
    liveUrl: "https://qurabic-indo-corpus.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/qurabic-indo-corpus",
    isNativeApp: false,
    caseStudy: {
      id: {
        problem: "Memahami akar kata bahasa Arab klasik beserta nuansa makna dalam bahasa Indonesia sulit dilakukan jika hanya membaca teks terjemahan datar.",
        approach: "Membangun sistem eksplorasi akar kata 3 huruf (triliteral root) yang membedah struktur kata per ayat ke dalam bentuk lemma, part-of-speech, dan pohon tata bahasa.",
        architecture: "Pencarian lemma di sisi client dengan SQLite WASM tanpa jeda server, dilengkapi visualisasi pohon sintaksis interaktif.",
        result: "Pencarian dan pembedahan morfologi kata Arab instan untuk peneliti, santri, dan pembelajar bahasa Arab."
      },
      en: {
        problem: "Navigating classical Arabic lemma roots and semantic nuances in translation lacks interactive graphical tools.",
        approach: "Engineered a tri-literal root exploration engine that breaks down verse morphology into lemmas, pos-tags, and syntax trees.",
        architecture: "Client-side indexed lemma search with SQLite WASM and interactive morphological highlighting.",
        result: "Instant morphological lookup and root breakdown for researchers and learners."
      }
    },
    deepDive: {
      id: {
        summary: "Qurabic menyediakan alat bantu telusur morfologi dan akar kata Arab klasik yang terhubung langsung dengan makna kontekstual bahasa Indonesia.",
        highlights: [
          "Indeks Akar Triliteral: Dekomposisi interaktif dari akar kata ke bentuk turunannya.",
          "Pencarian Klien Tanpa Jeda: Engine SQLite WASM berjalan langsung di browser.",
          "Pohon Sintaksis Visual: Penyorotan hubungan tata bahasa ayat secara langsung."
        ]
      },
      en: {
        summary: "Qurabic provides researchers with a high-precision morphological exploration tool for classical Arabic roots and meanings.",
        highlights: [
          "Tri-Literal Root Indexing: Interactive decomposition from root lemmas to derived forms.",
          "Zero-Latency Client Search: SQLite WASM engine running locally in browser.",
          "Visual Syntax Trees: Real-time morphological dependency highlighting."
        ]
      }
    }
  },
  {
    id: "terraflow",
    number: "05",
    title: "TERRA FLOW",
    tagline: {
      id: "Mesin keputusan Stoik mengubah dilema rumit menjadi graf aksi terstruktur",
      en: "Stoic decision engine converting complex dilemmas into executable ASTs"
    },
    category: "Cognitive Architecture",
    year: "2026",
    liveUrl: "https://seamless-problem-solver.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/seamless-problem-solver",
    isNativeApp: false,
    caseStudy: {
      id: {
        problem: "Kerap terjadi overthinking dan macet mengambil keputusan (analysis paralysis) saat menghadapi masalah hidup atau arsitektur sistem yang rumit.",
        approach: "Menerapkan prinsip Stoikisme 'Dikotomi Kendali' untuk membagi masalah menjadi pohon keputusan graf berarah (DAG) dengan bobot pilihan yang jelas.",
        architecture: "Evaluator bagan alur langkah-demi-langkah interaktif dengan fitur ekspor langsung ke format checklist aksi Markdown.",
        result: "Mengubah masalah rumit menjadi langkah aksi nyata yang jelas dalam waktu kurang dari 3 menit."
      },
      en: {
        problem: "Analysis paralysis and overwhelm during complex architectural and life decisions.",
        approach: "Applied Dichotomy of Control heuristics to transform fuzzy problems into directed acyclic decision graphs with probabilistic weighing.",
        architecture: "Interactive step-by-step flowchart evaluator with exportable markdown action plans.",
        result: "Structured clarity from chaotic problems in under 3 minutes."
      }
    },
    deepDive: {
      id: {
        summary: "Terra Flow menerapkan teori keputusan Stoik dan graf terarah untuk memecah kebimbangan rumit menjadi rencana kerja terstruktur.",
        highlights: [
          "Filter Dikotomi Kendali: Memisahkan hal yang bisa kita kendalikan dari hal luar.",
          "Pohon Keputusan Terarah: Menghitung jalur pilihan dan probabilitas hasil.",
          "Ekspor Rencana Aksi Markdown: Menghasilkan daftar tindakan siap eksekusi."
        ]
      },
      en: {
        summary: "Terra Flow applies Stoic decision theory and directed graphs to break overwhelming dilemmas into clear execution steps.",
        highlights: [
          "Dichotomy of Control Filter: Separates controllable actions from external factors.",
          "Directed Decision Tree: Computes clear pathways and expected outcomes.",
          "Markdown Action Plans: Exports actionable checklists directly."
        ]
      }
    }
  },
  {
    id: "social-affinity",
    number: "06",
    title: "SOCIAL AFFINITY",
    tagline: {
      id: "Graf orbit relasi manusia berdasarkan lapisan kapasitas kognitif Dunbar",
      en: "Visual relationship orbit graphs based on Dunbar's cognitive layers"
    },
    category: "Graph Visualization & Ergonomics",
    year: "2026",
    liveUrl: "https://social-affinity-network.vercel.app/",
    githubUrl: "https://github.com/AIZATFIR/social-affinity-network",
    isNativeApp: false,
    caseStudy: {
      id: {
        problem: "Daftar kontak di HP menampilkan ratusan orang dalam satu daftar panjang yang datar, padahal kapasitas otak manusia untuk merawat hubungan itu terbatas.",
        approach: "Memvisualisasikan relasi pertemanan sebagai orbit gravitasi konsentris sesuai Angka Dunbar (lingkaran 5 inti, 15 dekat, 50 teman, 150 kenalan).",
        architecture: "Simulasi node gravitasi berbasis fisika kanvas 2D dengan algoritma peluruhan waktu kontak terakhir.",
        result: "Mengingatkan untuk menyapa teman penting tanpa kecanduan algoritma media sosial."
      },
      en: {
        problem: "Standard contact lists treat connections as a flat infinite list, ignoring human Dunbar capacity limits.",
        approach: "Visualized personal social spheres as concentric gravitational orbits (Support Clique of 5, Sympathy Group of 15, Affinity Layer of 50).",
        architecture: "Physics-based collision-avoidance orbit simulation with recency decay algorithms.",
        result: "Mindful relationship care without social media algorithmic feeds."
      }
    },
    deepDive: {
      id: {
        summary: "Social Affinity memetakan lingkaran pertemanan berdasarkan kedalaman hubungan nyata, bukan sekadar jumlah kontak.",
        highlights: [
          "Orbit Lapisan Dunbar: Lingkaran konsentris mewakili kapasitas emosional manusia sejati.",
          "Simulasi Fisika Orbit: Interaksi visual node tarik-menarik di kanvas.",
          "Pengingat Interaksi: Menyorot teman yang sudah lama belum disapa."
        ]
      },
      en: {
        summary: "Social Affinity visualizes interpersonal relationships as gravitational orbits structured by Dunbar's numbers.",
        highlights: [
          "Dunbar Layer Orbits: Concentric visual rings for genuine human connection capacity.",
          "Physics Orbit Canvas: Interactive force-directed node simulation.",
          "Recency Reminders: Highlights connections that need mindful intentional outreach."
        ]
      }
    }
  },
  {
    id: "fitrah-launcher",
    number: "07",
    title: "FITRAH LAUNCHER",
    tagline: {
      id: "Peluncur beranda minimalis digital bebas distraksi untuk Android, Linux & Windows",
      en: "Distraction-free digital minimalism home launcher for Android, Linux & Windows"
    },
    category: "Digital Minimalism & Native OS",
    year: "2026",
    githubUrl: "https://github.com/AIZATFIR/Fitrah-Launcher",
    isNativeApp: true,
    platform: "Android APK • Linux x64 • Windows",
    caseStudy: {
      id: {
        problem: "Tampilan beranda HP modern dirancang seperti mesin slot kasino: penuh warna mencolok, rekomendasi tak penting, dan titik merah notifikasi yang memicu kecanduan.",
        approach: "Mengubah interaksi HP menjadi model 3 layar tenang: Jam Analog Fokus di kiri + Dashboard Fitrah di tengah + Laci Aplikasi A-Z minimalis di kanan.",
        architecture: "Nol titik notifikasi, drag busur jam langsung untuk atur waktu fokus, scrubber alfabet vertikal haptic, dan 100% privasi lokal offline.",
        result: "Mengembalikan fitrah manusia dan penggunaan gadget yang sadar, mengubah HP dari sumber distraksi menjadi alat kerja yang tenang."
      },
      en: {
        problem: "Modern smartphone home screens are engineered as dopamine traps with saturated clutter, recommendation feeds, and red badge counters.",
        approach: "Redesigns device interaction into a calm 3-screen spatial model: Focus Clock Face + Fitrah Dashboard + Minimalist A-Z Drawer.",
        architecture: "Zero notification badges, direct arc drag-to-plan time-blocking, haptic vertical A-Z scrubber, and 100% offline privacy.",
        result: "Restores intentional computing, transforming smartphones from slot machines into serene instruments."
      }
    },
    deepDive: {
      id: {
        summary: "Fitrah Launcher menggantikan layar utama HP yang bising dengan filosofi tata ruang yang tenang, fokus, dan menghormati perhatian pengguna.",
        highlights: [
          "Arsitektur 3 Layar Spasial: Geser kiri untuk jam fokus, tengah untuk dashboard, kanan untuk laci aplikasi.",
          "Nol Titik Notifikasi Merah: Menghilangkan pemicu psikologis buka HP tanpa sadar.",
          "Drag Busur Jam: Sentuh dan seret lingkaran jam untuk langsung menjadwalkan waktu kerja.",
          "Rilis Multiplatform: Tersedia APK untuk Android serta aplikasi desktop Linux & Windows."
        ]
      },
      en: {
        summary: "Fitrah Launcher replaces chaotic home screens with a calm, spatial philosophy centered on human attention and intentional routines.",
        highlights: [
          "Spatial 3-Screen Layout: Left for focus clock, center for dashboard, right for app drawer.",
          "Zero Notification Badges: Eliminates psychological triggers for compulsive checking.",
          "Direct Arc Planning: Touch and drag the clock dial to block time immediately.",
          "Cross-Platform: Native APK for Android alongside desktop Linux & Windows builds."
        ]
      }
    }
  },
  {
    id: "sadar",
    number: "08",
    title: "SADAR",
    tagline: {
      id: "Pendamping kesadaran kebiasaan harian & kepuasan batin sadar — Flutter",
      en: "Conscious habit awareness and daily fulfillment companion — Flutter"
    },
    category: "Human Awareness & Native OS",
    year: "2026",
    githubUrl: "https://github.com/AIZATFIR/Sadar",
    isNativeApp: true,
    platform: "Android APK • Linux • Windows",
    caseStudy: {
      id: {
        problem: "Aplikasi pencatat kebiasaan biasa terlalu terobsesi dengan 'angka streak' beruntun, sehingga memicu rasa bersalah dan ditinggalkan begitu saja saat bolong satu hari.",
        approach: "Dibangun berlandaskan pertanyaan 'Apakah hari ini saya hidup dengan cara yang saya syukuri dan banggakan?' Mengumpulkan bukti nyata tindakan bermakna setiap hari.",
        architecture: "Engine Flutter offline dengan timer fokus kunci layar, pencatatan fleksibel (durasi, hitungan, atau checklist), dan jurnal refleksi harian.",
        result: "Teman pendamping hidup yang tenang, bebas rasa bersalah, dan membantu membangun kesadaran diri yang berkelanjutan."
      },
      en: {
        problem: "Traditional habit trackers obsess over fragile streaks, causing anxiety and complete abandonment when a streak breaks.",
        approach: "Built around 'Did I live today in a way I can be proud of?' Turns meaningful daily actions into visible evidence of intentional living.",
        architecture: "Offline-first Flutter engine with lockscreen focus timer, flexible progression tracking, and evening reflective journaling.",
        result: "A serene, judgment-free companion for authentic self-awareness and conscious growth."
      }
    },
    deepDive: {
      id: {
        summary: "Sadar dirancang untuk kesadaran diri yang tulus, bukan permainan skor adiktif. Setiap aksi kebaikan dicatat sebagai bukti konsistensi pribadi.",
        highlights: [
          "Mesin Kebiasaan Fleksibel: Timer fokus dengan whitelist aplikasi, penghitung repetisi, dan checklist sederhana.",
          "Garis Waktu 7 Hari: Centang kebiasaan dalam 5 detik tanpa loading lama.",
          "Repetisi Identitas: Menampilkan akumulasi tindakan nyata selama berbulan-bulan.",
          "Refleksi Malam Hari: Jurnal singkat untuk mengevaluasi kepuasan batin di akhir hari."
        ]
      },
      en: {
        summary: "Sadar is designed around conscious habit awareness rather than addictive gamification.",
        highlights: [
          "Multi-Type Habit Engine: Timed focus mode with lockscreen whitelist, counts, and flexible checklists.",
          "7-Day Timeline: 1-tap logging in under 5 seconds without friction.",
          "Identity Repetition: Visual accumulations of practiced habits over months.",
          "Evening Reflection: Mindful check-in tracking emotional fulfillment."
        ]
      }
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
