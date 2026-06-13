import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedux,
  SiTailwindcss,
  SiMui,
  SiGit,
} from "react-icons/si";
import "./styles/TechStackMobile.css";

const techs = [
  { icon: <SiReact />, name: "React", color: "#61DAFB" },
  { icon: <SiTypescript />, name: "TypeScript", color: "#3178C6" },
  { icon: <SiJavascript />, name: "JavaScript", color: "#F7DF1E" },
  { icon: <SiNextdotjs />, name: "Next.js", color: "#ffffff" },
  { icon: <SiNodedotjs />, name: "Node.js", color: "#5FA04E" },
  { icon: <SiExpress />, name: "Express", color: "#ffffff" },
  { icon: <SiMongodb />, name: "MongoDB", color: "#47A248" },
  { icon: <SiPostgresql />, name: "PostgreSQL", color: "#4169E1" },
  { icon: <SiRedux />, name: "Redux", color: "#764ABC" },
  { icon: <SiTailwindcss />, name: "Tailwind", color: "#38BDF8" },
  { icon: <SiMui />, name: "Material UI", color: "#007FFF" },
  { icon: <SiGit />, name: "Git", color: "#F05032" },
];

const TechStackMobile = () => {
  return (
    <div className="techstack-mobile" id="techstack-mobile">
      <h2>
        My <span>Techstack</span>
      </h2>
      <div className="techm-grid">
        {techs.map((t) => (
          <div className="techm-item" key={t.name}>
            <span className="techm-icon" style={{ color: t.color }}>
              {t.icon}
            </span>
            <span className="techm-name">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackMobile;
