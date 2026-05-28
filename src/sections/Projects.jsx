import { ArrowUpRight, Github, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useState } from "react";

const projects = [
  {
    title: "Fintech Dashboard",
    description:
      "A comprehensive financial analytics platform with real-time data visualization and AI-powered insights.",
    image: "/projects/project1.png",
    tags: ["React", "Typescript", "Analytics"],
    link: "#",
    github: "https://github.com/rohit-pilore",
  },
  {
    title: "E-Commerce Solution",
    description:
      "A full-featured e-commerce platform with inventory management and seamless payment processing.",
    image: "/projects/project2.png",
    tags: ["Next.js", "Stripe", "Tailwind"],
    link: "#",
    github: "https://github.com/rohit-pilore",
  },
  {
    title: "AI Content Creation",
    description:
      "An intelligent writing assistant that helps users generate high-quality content using LLMs.",
    image: "/projects/project3.png",
    tags: ["React", "GPT-4", "FastAPI"],
    link: "#",
    github: "https://github.com/rohit-pilore",
  },
  {
    title: "Collaborative Workspace",
    description:
      "A real-time project management tool for teams with task tracking and interactive boards.",
    image: "/projects/project4.png",
    tags: ["Next.js", "Socket.io", "MongoDB"],
    link: "#",
    github: "https://github.com/rohit-pilore",
  },
  {
    title: "Kabaddi Ecosystem Platform",
    description:
      "A full-featured sports platform for Kabaddi, enabling player registration, tournament management, and real-time match updates.",
    image: "/projects/Screenshot 2026-04-16 123510.png",
    tags: ["React", "Firebase", "NodeJS"],
    link: "#",
    github: "https://github.com/rohit-pilore",
  },
  {
    title: "AI-Powered Solution Hub",
    description:
      "A modern platform focused on digital transformation, leveraging AI for scalable and efficient business operations.",
    image: "/projects/image.png",
    tags: ["Next.js", "OpenAI", "Cloud-Native"],
    link: "#",
    github: "https://github.com/rohit-pilore",
  },
  {
    title: "Multi-Cloud Management (MCM)",
    description:
      "A scalable cloud management platform for multi-cloud environments, optimizing resource usage and monitoring.",
    image: "/projects/Screenshot 2026-04-16 123619.png",
    tags: ["React", "AWS", "Dashboard"],
    link: "#",
    github: "https://github.com/rohit-pilore",
  },
  {
    title: "Smart System Dashboard",
    description:
      "Monitoring and management dashboard for enterprise-level smart systems and IoT devices.",
    image: "/projects/Screenshot 2026-04-16 123441.png",
    tags: ["React", "IoT", "ContextAPI"],
    link: "#",
    github: "https://github.com/rohit-pilore",
  },
];

export const Projects = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleProjects = isExpanded ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {visibleProjects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
              style={{ animationDelay: `${(idx % 4 + 1) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 
                bg-gradient-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight
                      className="w-5 h-5 
                    text-muted-foreground group-hover:text-primary
                     group-hover:translate-x-1 
                     group-hover:-translate-y-1 transition-all"
                    />
                  </a>
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <div onClick={() => setIsExpanded(!isExpanded)} className="inline-block">
            <AnimatedBorderButton>
              {isExpanded ? "Show Less" : "View All Projects"}
              {isExpanded ? <ChevronUp className="w-5 h-5 ml-1" /> : <ChevronDown className="w-5 h-5 ml-1" />}
            </AnimatedBorderButton>
          </div>
        </div>
      </div>
    </section>
  );
};
