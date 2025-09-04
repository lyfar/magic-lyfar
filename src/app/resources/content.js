import { Logo } from "@/components/Logo";

const person = {
  firstName: "Lyfar",
  lastName: "Studio",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Creative Technology Studio",
  avatar: "/images/me.png",
  email: "egor@lyfar.com",
  location: "Asia/Hong_Kong", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Russian"], // optional: Leave the array empty if you don't want to display languages
};

const contact = {
  display: true,
  title: <>Let's Work Together</>,
  description: (
    <>
      Ready for your next film, design project, or AI automation? Book a consultation to discuss how we can bring your vision to life.
    </>
  ),
  bookingUrl: "https://meet.egor.lol/lyfar/15min?layout=mobile",
  email: "egor@lyfar.com",
  phone: "5726 0632",
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/egor.lyfar/",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/lyfar/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} - Creative Technology Studio | AI, Software & Content`,
  description: `Hong Kong-based Creative Technology Studio unifying creative direction, software engineering, and AI automation to turn ideas live fast.`,
  headline: <>AI, Software & Content</>,
  subline: (
    <>
      Based in Hong Kong. Serving APAC. From idea to live - fast - so you can focus on what you love.
    </>
  ),
  featured: {
    display: true,
    title: <><strong className="ml-4">Creative Technology Studio</strong></>,
    href: "/about",
  },
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name} | Creative Technology Studio`,
  description: `Meet ${person.name}, Hong Kong-based Creative Technology Studio specializing in AI automation, software engineering, and content production.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://meet.egor.lol/lyfar/15min?layout=mobile",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        We diagnose your goal (trust, reach, speed, cost), pick the path (live-action, photo, AI-assisted, interactive, or hybrid), and instrument the flow so you can see time-to-ship, hours saved, and (when relevant) conversion lift.
      </>
    ),
  },
  work: {
    display: false,
    title: "About",
    subline: "Video Production Hong Kong",
    description: [
      "We are an entrepreneur-led video production house with extensive professional experience in Hong Kong.",
      "Starting with video projects for our social media audience, we now deliver bespoke video production services.",
      "We create corporate, commercial, fashion, and product videos, deeply involved in both pre-production and post-production.",
      "We work closely with industry professionals, social media influencers, and Hong Kong artists on content creation.",
      "We capture life stories by all means, using the latest technology to run our company in Hong Kong.",
      "You can check some amazing clients and partners testimonials here."
    ]
  },
  services: {
    display: true,
    title: "Services",
    items: [
      {
        title: "Strategy & Diagnostic",
        icon: "search",
        description: "Discovery, value-stream map, 'idea to live' plan, SLOs, KPI setup."
      },
      {
        title: "Content Production",
        icon: "video",
        description: "Live-action interviews/events, photography, AI-assisted media, motion, social kits."
      },
      {
        title: "Software",
        icon: "computer",
        description: "Websites, microsites, prototypes, and interfaces."
      },
      {
        title: "Automation & AI",
        icon: "cpu",
        description: "CRM, chatbots, workflow pipelines, data stitching, dashboards."
      },
      {
        title: "Content Ops & SMM",
        icon: "calendar",
        description: "Calendars, posting, moderation, ads ops, reporting."
      },
      {
        title: "Ongoing Management",
        icon: "grid",
        description: "Roadmap, sprints, QA, releases, performance dashboards."
      },
      {
        title: "Education & Masterclasses",
        icon: "book",
        description: "Applied AI for content/software/ops; prompts; playbooks."
      }
    ]
  },
  mission: {
    display: true,
    title: "Mission",
    description: "We plan, produce, build, ship, and manage in Hong Kong & APAC. We equip teams with AI to remove repetitive work, so content and software go live fast - and people spend time on what they love."
  },
  vision: {
    display: true,
    title: "Vision",
    parts: [
      {
        icon: "eye",
        title: "Vision",
        description: "Help teams automate the repetitive work, keep people doing what they love, and make 'idea to live' a normal pace across APAC - using the right medium for the job."
      },
      {
        icon: "target",
        title: "BHAG 2030",
        description: "Free and reinvest 1,000,000 human hours from repetitive work into what people love by 2030 - craft, learning, family, or rest - and publish an annual Happy Hours Report to show where that time went."
      }
    ]
  },
  manifesto: {
    display: false,
    title: "Manifesto",
    description: [
      "From Hong Kong roots, we've grown into a global crew - directing, analysing, coding, managing, automating and marketing. We constantly refine digital-content workflows and pass those gains to our clients, which leads us to value:"
    ],
    values: [],
    conclusion: "That is, while there is value in the items on the bottom, we value the items on top more."
  },
  values: {
    display: true,
    title: "Values",
    items: [
      {
        title: "Originality over Routine",
        icon: "sparkle",
        description: "Embrace creative solutions and avoid cookie-cutter approaches."
      },
      {
        title: "Craft & Aesthetics",
        icon: "gallery",
        description: "Value beautiful, thoughtful design and attention to detail."
      },
      {
        title: "Speed with Stability",
        icon: "rocket",
        description: "Deliver quickly while maintaining reliable, quality results."
      },
      {
        title: "Honest Data",
        icon: "grid",
        description: "Base decisions on transparent, accurate information and metrics."
      },
      {
        title: "Human Interaction",
        icon: "users",
        description: "Prioritize genuine human connections and collaboration."
      },
      {
        title: "Tool-Agnostic Innovation",
        icon: "code",
        description: "Use the best tools for the job, regardless of platform or vendor."
      }
    ]
  },
  principles: {
    display: true,
    title: "Principles",
    items: [
      {
        title: "Right Medium, Shortest Path",
        icon: "search",
        description: "Choose the most efficient approach and technology stack for each unique challenge."
      },
      {
        title: "AI Equips People",
        icon: "cpu",
        description: "AI enhances human capabilities and creativity; it doesn't replace the human element."
      },
      {
        title: "Cut Repetition, Amplify Craft",
        icon: "minus",
        description: "Eliminate repetitive tasks while elevating and showcasing human craftsmanship."
      },
      {
        title: "Measure What Moves the Needle",
        icon: "grid",
        description: "Focus on metrics that drive real business impact and meaningful outcomes."
      },
      {
        title: "Human First",
        icon: "person",
        description: "Prioritize people and relationships, giving everyone more time for what they love."
      }
    ]
  },
  studies: {
    display: false,
    title: "Education",
    institutions: [
      {
        name: "Computer Science Degree",
        description: <>Bachelor's in Computer Science with focus on web development and software engineering.</>,
      },
      {
        name: "Continuous Learning",
        description: <>Self-taught in modern web technologies, cloud computing, and best practices in software development.</>,
      },
    ],
  },
  technical: {
    display: false,
    title: "Technical Skills",
    skills: [
      {
        title: "React & Next.js",
        description: <>Expert in building modern web applications with React ecosystem, server-side rendering, and static site generation.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "React Project",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Next.js Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Full Stack Development",
        description: <>Proficient in Node.js, TypeScript, databases, and cloud deployment for end-to-end application development.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
  team: {
    display: true,
    title: "Team",
    members: [
      {
        name: "Egor Lyfar",
        role: "Technical Software Manager & Creative Director",
        image: person.avatar,
        description: "Creative director and technical lead, bringing together different partners who produce bespoke content, AI automation, development, and more."
      },
      // Add more team members here as needed
    ]
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: `${person.name} Blog - Creative Technology Insights`,
  description: `Creative technology insights, design trends, and AI automation strategies from ${person.name}, Hong Kong-based Creative Technology Studio.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `${person.name} Portfolio - Creative Technology Projects`,
  description: `Explore ${person.name}'s portfolio of creative technology projects, from AI automation and software development to content production and digital experiences.`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `${person.name} Gallery - Visual Storytelling`,
  description: `Explore ${person.name}'s visual storytelling through photography and creative imagery from projects and creative explorations.`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, contact, home, about, blog, work, gallery };
