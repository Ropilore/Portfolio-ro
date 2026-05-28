import { Meteors } from "@/components/Meteors";
import { Timeline } from "../components/Timeline";

export const Experience = () => {
  const getExperienceDurationText = () => {
    const startDate = new Date(2025, 9, 1); // October 1, 2025 (Month index 9 is October)
    const currentDate = new Date();
    
    const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - startDate.getMonth();
    
    // We add 1 because October 2025 is Month 1, November is Month 2, etc.
    let totalMonths = (yearsDiff * 12) + monthsDiff + 1;
    if (totalMonths < 1) totalMonths = 1;
    
    if (totalMonths < 12) {
      return `${totalMonths} ${totalMonths === 1 ? "month" : "months"}`;
    } else {
      const years = Math.floor(totalMonths / 12);
      const remainingMonths = totalMonths % 12;
      
      if (remainingMonths === 0) {
        return `${years} ${years === 1 ? "year" : "years"}`;
      } else {
        return `${years} ${years === 1 ? "year" : "years"} and ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
      }
    }
  };

  const expDuration = getExperienceDurationText();

  const dynamicExperiences = [
    {
      period: "2020 — 2021",
      role: "HSC — Science",
      company: "Maharashtra State Board",
      description:
        "Focused on Physics, Chemistry, Mathematics, and Biology developing strong analytical and problem-solving skills essential for technical education.",
      technologies: ["Percentage: 78.80%", "PCMB Group", "Science Stream"],
      status: "Completed",
    },
    {
      period: "2022 — 2025",
      role: "BSc in Information Technology",
      company: "NYNC College, Chalisgaon",
      link: "https://www.rashtriyacollege.com/",
      description:
        "Built a solid foundation in computer science and programming concepts during my undergraduate studies. Actively learned multiple programming languages and developed problem-solving skills through hands-on practice and academic projects.",
      technologies: ["HTML", "CSS", "JavaScript", "SQL", "C", "C++", "Java", "Data Structure and Algorithm"],
      status: "Completed",
    },
    {
      period: "2025 — Present",
      role: "Frontend Developer",
      company: "Revdau Private Limited",
      link: "https://revdau.ai/",
      description:
        `Acquired ${expDuration} of professional experience designing, building, and maintaining React and Next.js applications for enterprise clients. Introduced automated testing practices that improved code coverage to 85%.`,
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GitHub", "Framer Motion"],
      status: "present",
    },
  ];

  const data = dynamicExperiences.map((exp) => ({
    title: exp.period,
    content: (
      <div className="glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500 relative overflow-hidden mb-8">
        <Meteors number={15} />
        {exp.status && (
          <div className="mb-3">
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              {exp.status}
            </span>
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-semibold mb-1 text-foreground">
          {exp.role}
        </h3>
        {exp.link ? (
          <a
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-primary font-medium mb-4 hover:underline transition-all underline-offset-4"
          >
            {exp.company}
          </a>
        ) : (
          <p className="text-primary font-medium mb-4">{exp.company}</p>
        )}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {exp.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-6">
          {exp.technologies.map((tech, techIdx) => (
            <span
              key={techIdx}
              className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section id="experience" className="relative bg-black overflow-hidden pt-10">
      <Timeline data={data} />
    </section>
  );
};
