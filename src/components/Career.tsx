import "./styles/Career.css";

const Career = () => {
  return (
    <section className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Front End Developer</h4>
                <h5>Verveo Solutions Pvt Ltd</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Leading frontend development of an enterprise Airport Revenue
              Management Platform using React.js and TypeScript for US-based clients.
              Integrated ArcGIS Maps for geospatial visualization and map-based asset
              allocation. Currently developing an AI Agent Platform (AI-powered calls,
              SMS, and email campaigns), driving frontend architecture and mentoring
              junior developers.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Development Engineer I</h4>
                <h5>Navneet Toptech</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Contributed to a large-scale Learning Management System (LMS) used
              by schools across India. Implemented complex business logic and dynamic
              content management using React.js, Node.js, and TypeScript. Optimized
              frontend performance through lazy loading and code splitting.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Front-End Developer</h4>
                <h5>Digiblock Network Solutions</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Built two cryptocurrency-based platforms from scratch using Next.js
              (frontend) and Node.js (backend). Built a SaaS application using React.js
              with reusable components and clean, maintainable code.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MERN Stack Web Dev Intern</h4>
                <h5>Luminar Technolab</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Developed full-stack web applications using React.js, Node.js, MongoDB,
              and Express.js. Gained hands-on experience debugging, testing, and
              deploying applications in an agile development environment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Technology</h4>
                <h5>APJ Abdul Kalam Tech University</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Graduated with a degree in B.Tech in Kottayam, Kerala. Acquired fundamental
              knowledge of software engineering, web development, data structures, and databases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
