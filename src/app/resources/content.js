import { Logo } from "@/components/Logo";

const person = {
  firstName: "Egor",
  lastName: "Lyfar",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full Stack Developer",
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
  headline: <>Creative, Video and Tech Production</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Portfolio Showcase</strong></>,
    href: "/work",
  },
  subline: (
    <>
      I am Egor, I blend stories, pixels & code to craft compelling digital experiences.
      <br /> From concept to creation, I transform ideas into immersive realities that captivate and inspire.
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
        Egor is a full stack developer with a passion for creating robust, scalable web applications.
        His expertise spans modern JavaScript frameworks, backend development, and creating
        seamless user experiences that solve real-world problems.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Tech Innovations Inc",
        timeframe: "2022 - Present",
        role: "Senior Full Stack Developer",
        achievements: [
          <>
            Architected and developed scalable web applications serving over 10,000+ users,
            resulting in improved performance and user satisfaction.
          </>,
          <>
            Led the migration from legacy systems to modern tech stack, reducing loading times
            by 60% and improving code maintainability.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Project Image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Digital Solutions Co",
        timeframe: "2020 - 2022",
        role: "Frontend Developer",
        achievements: [
          <>
            Developed responsive web applications using React, Next.js, and TypeScript,
            delivering pixel-perfect designs and seamless user experiences.
          </>,
          <>
            Collaborated with design and backend teams to implement features that increased
            user engagement by 35% and reduced bounce rate by 25%.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
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
    display: true, // set to false to hide this section
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
