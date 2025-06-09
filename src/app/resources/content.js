import { Logo } from "@/components/Logo";

const person = {
  firstName: "Lyfar",
  lastName: "Studio",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Creative & Technical Production Studio",
  avatar: "/images/me.png",
  email: "egor@lyfar.com",
  location: "Asia/Hong_Kong", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Russian"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/egorlyfar",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/egorlyfar",
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/egorlyfar",
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
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Creative & Technical Direction</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Portfolio Showcase</strong></>,
    href: "/work",
  },
  subline: (
    <>
  We do Video, Design, and Code.
  <br />
  Whether it's a film, a product, a pixel-perfect interface, or cutting-edge AI automation — we make it hit.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        We bring ideas to life through film, sharp design, and smart code. From cinematic storytelling to pixel-perfect apps and seamless AI workflows, our projects turn attention into action.
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
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
        title: "Content",
        description: "Cinematic videos, social media content, fashion films, product showcases, corporate storytelling, complete post-production, and tailored distribution strategies.",
        image: "/images/gallery/horizontal-1.jpg"
      },
      {
        title: "Development",
        description: "Websites, web apps, internal tools, intuitive UI/UX design, e-commerce solutions, real-time dashboards, and efficient tech-team integrations.",
        image: "/images/gallery/horizontal-2.jpg"
      },
      {
        title: "AI",
        description: "Practical automations, advanced LLM integrations, custom self-hosted AI models, and fine-tuning solutions built specifically for your data, tech stack, and business goals.",
        image: "/images/gallery/horizontal-3.jpg"
      }
    ]
  },
  mission: {
    display: true,
    title: "Mission",
    parts: [
      {
        icon: "sparkle",
        image: "/images/gallery/horizontal-1.jpg",
        title: "For Our Studio",
        description: "Operate an autonomous creative hub where AI manages administration and logistics, freeing our artists to fully engage in their craft."
      },
      {
        icon: "rocket",
        image: "/images/gallery/horizontal-2.jpg",
        title: "For Our Partners",
        description: "Eliminate busywork and embed smart tools into your workflow, empowering you to concentrate on meaningful work that grows your business."
      }
    ]
  },
  manifesto: {
    display: true,
    title: "Manifesto",
    description: [
      "We've aligned our vision to extend beyond our Hong Kong video production company to a worldwide audience, encompassing video directing, business analytics, web development, project management, AI automation, and marketing.",
      "We are constantly uncovering better ways of producing digital content and providing the best services to our clients by doing it and helping others do it.",
      "Through this work we have come to value:"
    ],
    values: [
      {
        title: "Individuals and Interactions",
        subline: "Over processes and long-read communication",
        image: "/images/gallery/horizontal-1.jpg",
      },
      {
        title: "Finished Project",
        subline: "Over comprehensive briefs and story boards",
        image: "/images/gallery/horizontal-2.jpg",
      },
      {
        title: "Customer Collaboration",
        subline: "Over contract negotiation",
        image: "/images/gallery/horizontal-3.jpg",
      },
      {
        title: "Responding to Change",
        subline: "Over following a plan",
        image: "/images/gallery/horizontal-4.jpg",
      },
    ],
    conclusion: "That is, while there is value in the items on the bottom, we value the items on top more."
  },
  principles: {
    display: true,
    title: "Principles",
    points: [
      "Our highest priority is to satisfy the client through early and continuous delivery of valuable work, from video production to software development.",
      "Welcome changing requirements, even late in the process. We harness change for the client's competitive advantage.",
      "Deliver working results frequently, from a couple of days to a couple of weeks, whether rough cuts or software builds.",
      "Business stakeholders, project managers, creatives, and developers must work together daily throughout the project.",
      "Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done.",
      "Direct conversation is the most efficient and effective method of conveying information to and within a project team.",
      "Working software and finished videos are the primary measure of progress.",
      "We promote sustainable processes. Sponsors, creatives, and users should be able to maintain a constant pace indefinitely.",
      "Continuous attention to technical excellence and good design enhances the final product.",
      "Simplicity—the art of maximizing the amount of work not done—is essential.",
      "The best architectures, requirements, and designs emerge from self-organizing teams.",
      "At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly.",
    ]
  },
  studies: {
    display: false, // set to false to hide this section
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
    display: false, // set to false to hide this section
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
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Full Stack Project",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
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

export { person, social, newsletter, home, about, blog, work, gallery };
