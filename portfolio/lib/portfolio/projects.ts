import type { PortfolioProject } from "./types"

// Published projects are grounded in project repositories and verified Vercel production domains.
// A READY deployment does not guarantee every authenticated workflow has been validated.
export const projects: PortfolioProject[] = [
  {
    "id": "conduit",
    "slug": "conduit",
    "index": "01",
    "title": "Conduit",
    "category": "Collaboration / productivity",
    "year": "2026",
    "status": "Published web preview · product in development",
    "tagline": "A connected workspace for communication, tasks, projects and progress.",
    "summary": "A web-based collaboration product exploring the path from conversation to actionable work: shared spaces, task ownership, project visibility and connected activity.",
    "role": "Product direction, full-stack application development and interaction design.",
    "problem": "Teams lose context when messages, tasks and project tracking live in disconnected tools.",
    "solution": "A unified product direction that connects conversations to tasks, people, workspaces and project milestones through a responsive web experience.",
    "decision": "Treat communication and task context as connected objects instead of separate destinations. The published landing page demonstrates the interaction model.",
    "outcomes": [
      "Published a responsive cinematic product website and an installable-web-app foundation. The landing page uses illustrative examples, not real customer metrics."
    ],
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PWA"
    ],
    "projectUrl": "https://conduit-blush.vercel.app",
    "gallery": [
      {
        "src": "/project-media/conduit-wordmark.svg",
        "alt": "Official black Conduit wordmark from the published product",
        "label": "Published Conduit identity"
      }
    ],
    "links": [
      {
        "label": "Open published website",
        "href": "https://conduit-blush.vercel.app",
        "internal": false
      }
    ],
    "featured": true,
    "archive": false,
    "order": 1,
    "contentState": "existing"
  },
  {
    "id": "merkat",
    "slug": "merkat",
    "index": "02",
    "title": "Merkat",
    "category": "Social communication / planning",
    "year": "2026",
    "status": "Public preview · hosted functionality under verification",
    "tagline": "Talk. Plan. Meet. A mobile-first social space for conversations that lead to real plans.",
    "summary": "A communication product centered on chats, friendships and shared plans. Username/password accounts, persistent direct messages, unread states and accepted friendships are implemented in its documented development foundation; hosted end-to-end verification remains in progress.",
    "role": "Product concept, UX, brand direction and full-stack engineering.",
    "problem": "Everyday chat, friendships and planning can become disconnected, especially on mobile.",
    "solution": "A Next.js and PostgreSQL application for account identity, friend relationships and direct conversations, designed around a clear mobile navigation system and a future chat-to-plan calendar workflow.",
    "decision": "Keep the center action focused on starting conversations. Treat group coordination and calendar integration as product direction unless verified in the published environment.",
    "outcomes": [
      "Published a hosted preview with the original Merkat brand.",
      "Documented persistent direct messaging, friendship and recovery workflows for development environments. Public hosting is not presented as fully verified."
    ],
    "technologies": [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Supabase Realtime"
    ],
    "projectUrl": "https://merkat-umber.vercel.app",
    "repositoryUrl": "https://github.com/S4DRA/Merkat",
    "gallery": [
      {
        "src": "/project-media/merkat-icon.png",
        "alt": "Original Merkat orange app icon with white capsule M",
        "label": "Official Merkat app icon"
      },
      {
        "src": "https://merkat-umber.vercel.app/icons/merkat-512.png",
        "alt": "Merkat square app icon",
        "label": "Published app icon"
      }
    ],
    "links": [
      {
        "label": "Open public preview",
        "href": "https://merkat-umber.vercel.app",
        "internal": false
      },
      {
        "label": "GitHub repository",
        "href": "https://github.com/S4DRA/Merkat",
        "internal": false
      }
    ],
    "featured": true,
    "archive": false,
    "order": 2,
    "contentState": "existing"
  },
  {
    "id": "dampener",
    "slug": "dampener",
    "index": "03",
    "title": "Dampener",
    "category": "Financial SaaS",
    "status": "Published web product · active development",
    "tagline": "A finance workspace for tracking cash flow, invoices, budgets, forecasts, reports, and team access.",
    "summary": "A finance workspace for tracking cash flow, invoices, budgets, forecasts, reports, and team access.",
    "role": "I designed the product direction, built the interface, shaped the feature set, and worked through the dashboard, auth, reporting, and workspace flows.",
    "problem": "Dampener started as a personal finance tracker. As I added forecasting, invoices, workspaces, and imports, the original structure became too small for the product I wanted to build.",
    "solution": "Landing page, login flow, financial dashboard, transaction structure, invoices, recurring items, budgets, forecasting, reports, exports, and business workspaces.",
    "decision": "I moved the product away from a simple tracker layout and toward a workspace model so it could support both personal and team use without turning every view into a separate product.",
    "outcomes": [
      "The product became more restrained over time. I removed decorative finance language and made the interface focus on what users need to understand first: money in, money out, trends, and next actions.",
      "Published a mobile-responsive landing experience; the screenshot gallery shows real Dampener product pages."
    ],
    "links": [
      {
        "label": "Explore published website",
        "href": "https://dampener.vercel.app",
        "internal": false
      }
    ],
    "gallery": [
      {
        "src": "/dampener-homepage.png",
        "alt": "Dampener landing page with a dark finance product layout",
        "label": "Public landing page",
        "legacyClassName": "lg:col-span-2"
      },
      {
        "src": "/dampener-dashboard.png",
        "alt": "Dampener dashboard showing financial metrics and navigation",
        "label": "Dashboard",
        "legacyClassName": ""
      },
      {
        "src": "/dampener-login.png",
        "alt": "Dampener login screen",
        "label": "Login",
        "legacyClassName": ""
      }
    ],
    "featured": true,
    "archive": false,
    "order": 3,
    "contentState": "existing",
    "legacyHome": {
      "kind": "featured",
      "icon": "Wallet",
      "eyebrow": "Featured project",
      "tone": "financial"
    },
    "year": "2026",
    "projectUrl": "https://dampener.vercel.app",
    "technologies": [
      "Next.js",
      "TypeScript",
      "Financial dashboards",
      "Responsive web"
    ]
  },
  {
    "id": "axivoz",
    "slug": "axivoz",
    "title": "Axivoz",
    "category": "Desktop assistant",
    "status": "Research / interface prototype · not a public production app",
    "tagline": "A desktop assistant concept for controlling computer tasks through a focused conversational interface.",
    "summary": "A desktop assistant concept for controlling computer tasks through a focused conversational interface.",
    "role": "I shaped the product idea, designed the assistant atmosphere, and built the preview around a simple command-led interaction model.",
    "problem": "Desktop work often becomes a stack of small repeated actions. I wanted to explore how an assistant could help without feeling like another noisy app.",
    "solution": "Assistant workspace, command flow, product language, interface preview, and the visual direction for a voice-first desktop tool.",
    "decision": "I kept the interface concentrated around one command surface instead of spreading the experience across many widgets.",
    "outcomes": [
      "The early idea was broad automation. I narrowed it into a quieter assistant that makes task intent visible and keeps the user in control."
    ],
    "links": [
      {
        "label": "GitHub repository",
        "href": "https://github.com/S4DRA/Axivoz",
        "internal": false
      }
    ],
    "gallery": [
      {
        "src": "/axivoz-preview.svg",
        "alt": "Axivoz desktop assistant interface preview",
        "label": "Assistant interface",
        "legacyClassName": "lg:col-span-2"
      }
    ],
    "featured": false,
    "archive": true,
    "order": 13,
    "contentState": "existing",
    "legacyHome": {
      "kind": "featured",
      "icon": "Bot",
      "eyebrow": "Featured project",
      "tone": "voice"
    },
    "year": "2026",
    "repositoryUrl": "https://github.com/S4DRA/Axivoz",
    "technologies": [
      "Product design",
      "Desktop UX",
      "Prototyping"
    ]
  },
  {
    "id": "val",
    "slug": "val",
    "index": "04",
    "title": "VAL",
    "category": "Social platform / Windows desktop",
    "year": "2026",
    "status": "Published web app and Windows download",
    "tagline": "A place for friends, groups, messages and voice rooms—on the web and on Windows.",
    "summary": "VAL brings friends, shared spaces and communication into one product. It includes a responsive public site, account flows, channels and messaging, and a Windows installer with a published update path.",
    "role": "Product design and cross-platform engineering.",
    "problem": "Communities need familiar communication tools without losing the feeling of a shared place.",
    "solution": "A Next.js communication platform with spaces, direct messages and voice-oriented collaboration, paired with an installable Windows desktop client.",
    "decision": "Keep the same account and product structure across browser and desktop, while giving desktop users a proper installer and release-update experience.",
    "outcomes": [
      "Published web application and Windows download page.",
      "Desktop release handling checks the current published installer rather than displaying a hard-coded version."
    ],
    "technologies": [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Supabase",
      "Windows desktop"
    ],
    "projectUrl": "https://doshab.vercel.app",
    "repositoryUrl": "https://github.com/S4DRA/Doshab",
    "gallery": [
      {
        "src": "/project-media/val-mark.png",
        "alt": "Official VAL whale logo mark",
        "label": "Published VAL brand mark"
      },
      {
        "src": "https://doshab.vercel.app/brand/val-mark-256.png",
        "alt": "VAL small-format whale mark",
        "label": "Brand icon"
      }
    ],
    "links": [
      {
        "label": "Explore VAL",
        "href": "https://doshab.vercel.app",
        "internal": false
      },
      {
        "label": "Windows download",
        "href": "https://doshab.vercel.app/download",
        "internal": false
      },
      {
        "label": "GitHub repository",
        "href": "https://github.com/S4DRA/Doshab",
        "internal": false
      }
    ],
    "featured": true,
    "archive": false,
    "order": 4,
    "contentState": "existing",
    "legacyHome": {
      "kind": "secondary",
      "icon": "MessageCircle"
    }
  },
  {
    "id": "fxck-it",
    "slug": "fxck-it",
    "index": "05",
    "title": "FxCK IT!",
    "category": "Multiplayer party game",
    "year": "2026",
    "status": "Public playable release · October 2026",
    "tagline": "One letter, too many answers, and your friends judging every word.",
    "summary": "A spooky browser word-party game inspired by Esm Famil. Players join six-character rooms, pick avatars, fill category sheets, vote on answers and reveal their scores together.",
    "role": "Game concept, interaction design, full-stack development and deployment.",
    "problem": "Traditional word games are hard to coordinate remotely when every player needs a shared timer, private answers and fair judging.",
    "solution": "Room-code multiplayer with host-managed rounds and categories, player voting, server-authoritative scoring, account-free guest identity, private photo avatars and durable game state.",
    "decision": "Keep the game social: the players, not an AI referee, judge answers. Server authority enforces the timer, score rules and private drafts.",
    "outcomes": [
      "Published at fxck-it.vercel.app using Vercel Hobby and Supabase Free.",
      "Supports up to 16 room seats by default, configurable categories, voting, private photos and reliable reconnects.",
      "Independent browser gameplay and multi-client recovery were verified for the October 2026 release; physical-phone validation is still separate."
    ],
    "technologies": [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Realtime",
      "Multiplayer"
    ],
    "projectUrl": "https://fxck-it.vercel.app",
    "gallery": [
      {
        "src": "/project-media/fxck-cover.svg",
        "alt": "FxCK IT! editorial cover using original in-game ghost and pumpkin drawings",
        "label": "Original game artwork / portfolio arrangement"
      },
      {
        "src": "/project-media/fxck-ghost.svg",
        "alt": "Original FxCK IT! ghost sticker on a colorful background",
        "label": "In-game ghost character artwork"
      }
    ],
    "links": [
      {
        "label": "Play the published game",
        "href": "https://fxck-it.vercel.app",
        "internal": false
      }
    ],
    "featured": true,
    "archive": false,
    "order": 5,
    "contentState": "existing"
  },
  {
    "id": "smart-office-security-camera",
    "slug": "smart-office-security-camera",
    "title": "Smart Office Security Camera",
    "category": "Computer vision prototype",
    "summary": "A YOLOv5 and Python project that turns camera footage into a real-time alert loop through Telegram notifications.",
    "evidence": "The useful part was not a dashboard score. It was the escalation path: detect a person, decide whether it matters, and notify someone quickly.",
    "technologies": [
      "Python",
      "YOLOv5",
      "Telegram API"
    ],
    "featured": false,
    "archive": true,
    "order": 15,
    "contentState": "existing",
    "legacyHome": {
      "kind": "secondary",
      "icon": "Camera"
    },
    "presentations": {
      "programming-projects": {
        "title": "Smart Office Security Camera",
        "description": "An AI-based monitoring system using vision models and alerting logic to detect suspicious events in real time.",
        "tags": [
          "Python",
          "YOLOv5",
          "Telegram API"
        ],
        "order": 0
      }
    }
  },
  {
    "id": "user-rating-prediction-system",
    "slug": "user-rating-prediction-system",
    "title": "User Rating Prediction System",
    "category": "Recommendation logic",
    "summary": "A C++ project focused on predicting likely user ratings from incomplete preference data.",
    "evidence": "It helped me think about data gaps, pattern recognition, and the product consequences of recommendation quality.",
    "technologies": [
      "C++",
      "Algorithms",
      "Data Analysis"
    ],
    "featured": false,
    "archive": true,
    "order": 16,
    "contentState": "existing",
    "legacyHome": {
      "kind": "secondary",
      "icon": "Star"
    },
    "presentations": {
      "programming-projects": {
        "title": "User Rating Prediction System",
        "description": "A C++ modeling project focused on interpreting rating behavior and generating useful predictions.",
        "tags": [
          "C++",
          "Algorithms",
          "Prediction"
        ],
        "order": 1
      }
    }
  },
  {
    "id": "health-tracker-app-research",
    "slug": "health-tracker-app-research",
    "title": "Health Tracker App Research",
    "category": "Product research",
    "summary": "A usability and documentation review for a health product where clarity affects trust.",
    "evidence": "I mapped the user flow and translated the product logic into clearer documentation for evaluation and onboarding.",
    "technologies": [
      "Research",
      "Documentation",
      "Health Tech"
    ],
    "featured": false,
    "archive": true,
    "order": 17,
    "contentState": "existing",
    "legacyHome": {
      "kind": "secondary",
      "icon": "HeartPulse"
    }
  },
  {
    "id": "iot-research",
    "slug": "iot-research",
    "title": "IoT Research",
    "category": "Technical research",
    "summary": "A research project about IoT architecture, networking behavior, reliability, latency, and security tradeoffs.",
    "evidence": "The output was a structured technical presentation made to explain complex infrastructure in a practical way.",
    "technologies": [
      "IoT",
      "Networking",
      "Research"
    ],
    "featured": false,
    "archive": true,
    "order": 18,
    "contentState": "existing",
    "legacyHome": {
      "kind": "secondary",
      "icon": "RadioTower"
    }
  },
  {
    "id": "dasaphase",
    "slug": "dasaphase",
    "title": "DasaPhase Game Concept",
    "category": "Experimental game direction",
    "summary": "A narrative concept about a surreal school-to-dream-world transition and the mood of moving between those spaces.",
    "evidence": "This project let me explore atmosphere, pacing, and world logic outside conventional product interfaces.",
    "technologies": [
      "Game Design",
      "Storytelling",
      "Worldbuilding"
    ],
    "featured": false,
    "archive": true,
    "order": 19,
    "contentState": "existing",
    "legacyHome": {
      "kind": "secondary",
      "icon": "Gamepad2"
    },
    "presentations": {
      "game-projects": {
        "title": "DasaPhase",
        "description": "A surreal game concept about a boy waking late for school and slipping into a mysterious dreamlike world.",
        "tags": [
          "Narrative",
          "Concept",
          "Atmosphere"
        ],
        "order": 0
      }
    }
  },
  {
    "id": "interaction-app-prototype",
    "slug": "interaction-app-prototype",
    "title": "Interaction App Prototype",
    "category": "programming-projects",
    "summary": "A university project centered on application structure, interface behavior, and multi-step user interaction.",
    "technologies": [
      "UI Logic",
      "Prototype",
      "Research"
    ],
    "featured": false,
    "archive": true,
    "order": 20,
    "contentState": "existing",
    "presentations": {
      "programming-projects": {
        "title": "Interaction App Prototype",
        "description": "A university project centered on application structure, interface behavior, and multi-step user interaction.",
        "tags": [
          "UI Logic",
          "Prototype",
          "Research"
        ],
        "order": 2
      }
    }
  },
  {
    "id": "exairon-website-sample",
    "slug": "exairon-website-sample",
    "title": "Exairon Website Sample",
    "category": "website-design",
    "summary": "This sample presents a landing page for Exairon with a strong hero section, partner logos, and feature-led messaging. The dark blue and orange contrast gives it a clear brand identity, while the structure supports quick reading through headline, proof, and product explanation sections.",
    "technologies": [
      "Landing Page",
      "Product Website",
      "Branding"
    ],
    "featured": false,
    "archive": true,
    "order": 21,
    "contentState": "existing",
    "presentations": {
      "website-design": {
        "title": "Exairon Website Sample",
        "description": "This sample presents a landing page for Exairon with a strong hero section, partner logos, and feature-led messaging. The dark blue and orange contrast gives it a clear brand identity, while the structure supports quick reading through headline, proof, and product explanation sections.",
        "tags": [
          "Landing Page",
          "Product Website",
          "Branding"
        ],
        "imageSrc": "/website-1.png",
        "imageAlt": "Exairon website landing page sample",
        "order": 0
      }
    },
    "gallery": [
      {
        "src": "/website-1.png",
        "alt": "Exairon website landing page sample"
      }
    ]
  },
  {
    "id": "portfolio-experience",
    "slug": "portfolio-experience",
    "title": "Portfolio Experience",
    "category": "website-design",
    "summary": "A polished personal site direction that mixes atmosphere, motion, and project-first storytelling.",
    "technologies": [
      "Portfolio",
      "Motion",
      "Storytelling"
    ],
    "featured": false,
    "archive": true,
    "order": 22,
    "contentState": "existing",
    "presentations": {
      "website-design": {
        "title": "Portfolio Experience",
        "description": "A polished personal site direction that mixes atmosphere, motion, and project-first storytelling.",
        "tags": [
          "Portfolio",
          "Motion",
          "Storytelling"
        ],
        "order": 1
      }
    }
  },
  {
    "id": "creative-studio-site",
    "slug": "creative-studio-site",
    "title": "Creative Studio Site",
    "category": "website-design",
    "summary": "A more expressive web concept where typography, image rhythm, and transitions define the mood.",
    "technologies": [
      "Creative",
      "Editorial",
      "Responsive"
    ],
    "featured": false,
    "archive": true,
    "order": 23,
    "contentState": "existing",
    "presentations": {
      "website-design": {
        "title": "Creative Studio Site",
        "description": "A more expressive web concept where typography, image rhythm, and transitions define the mood.",
        "tags": [
          "Creative",
          "Editorial",
          "Responsive"
        ],
        "order": 2
      }
    }
  },
  {
    "id": "school-to-dream-transition",
    "slug": "school-to-dream-transition",
    "title": "School-to-Dream Transition",
    "category": "game-projects",
    "summary": "A level progression idea built around contrast, turning an ordinary environment into something uncanny and symbolic.",
    "technologies": [
      "Level Design",
      "Mood",
      "Pacing"
    ],
    "featured": false,
    "archive": true,
    "order": 24,
    "contentState": "existing",
    "presentations": {
      "game-projects": {
        "title": "School-to-Dream Transition",
        "description": "A level progression idea built around contrast, turning an ordinary environment into something uncanny and symbolic.",
        "tags": [
          "Level Design",
          "Mood",
          "Pacing"
        ],
        "order": 1
      }
    }
  },
  {
    "id": "interactive-worldbuilding",
    "slug": "interactive-worldbuilding",
    "title": "Interactive Worldbuilding",
    "category": "game-projects",
    "summary": "A direction for creating lore and emotional context through environment design rather than exposition alone.",
    "technologies": [
      "Worldbuilding",
      "Story",
      "Immersion"
    ],
    "featured": false,
    "archive": true,
    "order": 25,
    "contentState": "existing",
    "presentations": {
      "game-projects": {
        "title": "Interactive Worldbuilding",
        "description": "A direction for creating lore and emotional context through environment design rather than exposition alone.",
        "tags": [
          "Worldbuilding",
          "Story",
          "Immersion"
        ],
        "order": 2
      }
    }
  },
  {
    "id": "3-bahcesehir-university-iranian-students-community",
    "slug": "3-bahcesehir-university-iranian-students-community",
    "title": "3. Bahcesehir University Iranian Students Community",
    "category": "logo",
    "summary": "This circular badge feels official and community-driven. The outer rings, bilingual naming, and central Iranian imagery make it read more like an institutional emblem than a startup logo, which suits a student association well.",
    "technologies": [
      "Emblem",
      "Community",
      "Institutional"
    ],
    "featured": false,
    "archive": true,
    "order": 26,
    "contentState": "existing",
    "presentations": {
      "logo": {
        "title": "3. Bahcesehir University Iranian Students Community",
        "description": "This circular badge feels official and community-driven. The outer rings, bilingual naming, and central Iranian imagery make it read more like an institutional emblem than a startup logo, which suits a student association well.",
        "tags": [
          "Emblem",
          "Community",
          "Institutional"
        ],
        "imageSrc": "/3.png",
        "imageAlt": "Circular logo for Bahcesehir University Iranian Students Community",
        "order": 0
      }
    },
    "gallery": [
      {
        "src": "/3.png",
        "alt": "Circular logo for Bahcesehir University Iranian Students Community"
      }
    ]
  },
  {
    "id": "4-rootonset-neon-wordmark",
    "slug": "4-rootonset-neon-wordmark",
    "title": "4. ROOTONSET Neon Wordmark",
    "category": "logo",
    "summary": "The glowing treatment gives this version a strong gaming or music-brand energy. The mountain-like silhouette around the lettering makes the word feel carved into a peak, which adds scale and drama.",
    "technologies": [
      "Wordmark",
      "Neon",
      "High Energy"
    ],
    "featured": false,
    "archive": true,
    "order": 27,
    "contentState": "existing",
    "presentations": {
      "logo": {
        "title": "4. ROOTONSET Neon Wordmark",
        "description": "The glowing treatment gives this version a strong gaming or music-brand energy. The mountain-like silhouette around the lettering makes the word feel carved into a peak, which adds scale and drama.",
        "tags": [
          "Wordmark",
          "Neon",
          "High Energy"
        ],
        "imageSrc": "/4.png",
        "imageAlt": "Neon ROOTONSET wordmark on a black background",
        "order": 1
      }
    },
    "gallery": [
      {
        "src": "/4.png",
        "alt": "Neon ROOTONSET wordmark on a black background"
      }
    ]
  },
  {
    "id": "5-rootonset-black-and-white",
    "slug": "5-rootonset-black-and-white",
    "title": "5. ROOTONSET Black and White",
    "category": "logo",
    "summary": "This black-and-white version strips the concept back to form and contrast. It keeps the same towering perspective, which is a good sign that the core shape is memorable even without color or glow effects.",
    "technologies": [
      "Wordmark",
      "Monochrome",
      "Form Study"
    ],
    "featured": false,
    "archive": true,
    "order": 28,
    "contentState": "existing",
    "presentations": {
      "logo": {
        "title": "5. ROOTONSET Black and White",
        "description": "This black-and-white version strips the concept back to form and contrast. It keeps the same towering perspective, which is a good sign that the core shape is memorable even without color or glow effects.",
        "tags": [
          "Wordmark",
          "Monochrome",
          "Form Study"
        ],
        "imageSrc": "/5.png",
        "imageAlt": "Black and white ROOTONSET wordmark",
        "order": 2
      }
    },
    "gallery": [
      {
        "src": "/5.png",
        "alt": "Black and white ROOTONSET wordmark"
      }
    ]
  },
  {
    "id": "6-minimal-peak-symbol",
    "slug": "6-minimal-peak-symbol",
    "title": "6. Minimal Peak Symbol",
    "category": "logo",
    "summary": "This mark is extremely reduced: just a few vertical forms building to a central peak. It reads like a skyline, a crown, or a stylized monogram, so it has flexibility, but it may need more surrounding brand context to feel unique.",
    "technologies": [
      "Minimal",
      "Abstract",
      "Architectural"
    ],
    "featured": false,
    "archive": true,
    "order": 29,
    "contentState": "existing",
    "presentations": {
      "logo": {
        "title": "6. Minimal Peak Symbol",
        "description": "This mark is extremely reduced: just a few vertical forms building to a central peak. It reads like a skyline, a crown, or a stylized monogram, so it has flexibility, but it may need more surrounding brand context to feel unique.",
        "tags": [
          "Minimal",
          "Abstract",
          "Architectural"
        ],
        "imageSrc": "/6.jpg",
        "imageAlt": "Minimal black symbol made of five rising vertical shapes",
        "order": 3
      }
    },
    "gallery": [
      {
        "src": "/6.jpg",
        "alt": "Minimal black symbol made of five rising vertical shapes"
      }
    ]
  },
  {
    "id": "7-experimental-lightning-mark",
    "slug": "7-experimental-lightning-mark",
    "title": "7. Experimental Lightning Mark",
    "category": "logo",
    "summary": "This feels raw, aggressive, and motion-heavy. The central shape suggests a slashed letterform with electric or flame-like accents, which creates attitude fast, though it is less immediately legible than the more structured pieces.",
    "technologies": [
      "Experimental",
      "Dynamic",
      "Edgy"
    ],
    "featured": false,
    "archive": true,
    "order": 30,
    "contentState": "existing",
    "presentations": {
      "logo": {
        "title": "7. Experimental Lightning Mark",
        "description": "This feels raw, aggressive, and motion-heavy. The central shape suggests a slashed letterform with electric or flame-like accents, which creates attitude fast, though it is less immediately legible than the more structured pieces.",
        "tags": [
          "Experimental",
          "Dynamic",
          "Edgy"
        ],
        "imageSrc": "/7.jpg",
        "imageAlt": "Abstract black and white symbol with jagged electric accents",
        "order": 4
      }
    },
    "gallery": [
      {
        "src": "/7.jpg",
        "alt": "Abstract black and white symbol with jagged electric accents"
      }
    ]
  },
  {
    "id": "8-rootonset-soft-gradient-variant",
    "slug": "8-rootonset-soft-gradient-variant",
    "title": "8. ROOTONSET Soft Gradient Variant",
    "category": "logo",
    "summary": "This version softens the neon direction into something more polished and product-ready. The gradient and drop-shadow still give it depth, but the lighter background makes it feel more versatile for broader brand applications.",
    "technologies": [
      "Wordmark",
      "Gradient",
      "Refined"
    ],
    "featured": false,
    "archive": true,
    "order": 31,
    "contentState": "existing",
    "presentations": {
      "logo": {
        "title": "8. ROOTONSET Soft Gradient Variant",
        "description": "This version softens the neon direction into something more polished and product-ready. The gradient and drop-shadow still give it depth, but the lighter background makes it feel more versatile for broader brand applications.",
        "tags": [
          "Wordmark",
          "Gradient",
          "Refined"
        ],
        "imageSrc": "/8.jpg",
        "imageAlt": "ROOTONSET wordmark with a silver and purple-red gradient",
        "order": 5
      }
    },
    "gallery": [
      {
        "src": "/8.jpg",
        "alt": "ROOTONSET wordmark with a silver and purple-red gradient"
      }
    ]
  }
]

export const primaryProjects = projects.filter(project => project.featured).sort((a, b) => a.order - b.order)
export const archiveProjects = projects.filter(project => project.archive).sort((a, b) => a.order - b.order)

export function getProjectShowcases(route: string) {
  // Published work appears ahead of earlier academic exercises, without erasing
  // any archive content. Brand assets are project-owned, never stock screenshots.
  const publishedIdsByRoute: Record<string, string[]> = {
    "programming-projects": ["val", "fxck-it", "conduit", "merkat", "dampener", "axivoz"],
    "game-projects": ["fxck-it"],
    "website-design": ["conduit", "dampener"],
  }
  const published = (publishedIdsByRoute[route] ?? []).flatMap((id, index) => {
    const project = projects.find(item => item.id === id)
    if (!project) return []
    const image = project.gallery?.[0]
    return [{
      title: project.title,
      description: [project.summary ?? project.tagline ?? "", project.status ?? ""].filter(Boolean).join(" — "),
      tags: project.technologies ?? [],
      ...(image ? { imageSrc: image.src, imageAlt: image.alt } : {}),
      order: -100 + index,
    }]
  })
  const existing = projects.flatMap(project => project.presentations?.[route] ?? [])
  return [...published, ...existing].sort((a, b) => a.order - b.order)
}
