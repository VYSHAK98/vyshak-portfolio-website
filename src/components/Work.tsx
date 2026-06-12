import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Airport Revenue Management",
    category: "Enterprise Fintech App",
    tools: "Next.js, React.js, TypeScript, Material UI, Tailwind CSS, React Router 7, Payment Gateways, ArcGIS APIs",
    image: "/images/work/airport.svg",
  },
  {
    title: "Learning Management System (LMS)",
    category: "EdTech Platform",
    tools: "React.js, Node.js, TypeScript, Lazy Loading, Code Splitting, Dynamic Content",
    image: "/images/work/lms.svg",
  },
  {
    title: "Crypto Exchange Platform",
    category: "Web3 / Blockchain",
    tools: "Next.js, Node.js, React.js, Web3 Integrations, Real-time Charts",
    image: "/images/work/exchange.svg",
  },
  {
    title: "Crypto Lending Platform",
    category: "Web3 / Blockchain",
    tools: "Next.js, Node.js, React.js, Tailwind CSS, Smart Contract Integration",
    image: "/images/work/lending.svg",
  },
  {
    title: "Enterprise SaaS Application",
    category: "SaaS / Cloud Application",
    tools: "React.js, Reusable UI Components, Context API, Clean Code",
    image: "/images/work/saas.svg",
  },
  {
    title: "Full-Stack Web Projects",
    category: "MERN Stack Portfolio",
    tools: "React.js, Node.js, Express.js, MongoDB, REST APIs, CRUD Operations",
    image: "/images/work/mern.svg",
  },
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
