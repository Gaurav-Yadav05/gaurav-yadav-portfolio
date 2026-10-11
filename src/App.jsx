
import { useEffect, useRef } from "react";
import "./index.css";

const skills = [
  "C++", "Python", "Java", "HTML", "CSS", "JavaScript",
  "React", "Node.js", "Express", "MySQL", "MongoDB", "Git"
];

const projects = [
  {
    number: "01",
    name: "NOVA AI",
    type: "VOICE ASSISTANT",
    description:
      "A personal desktop assistant designed to make everyday computer tasks easier through voice commands.",
    tech: ["Python", "Speech Recognition", "Automation"],
    link: "https://github.com/Gaurav-Yadav05"
  },
  {
    number: "02",
    name: "MOVIQUE",
    type: "FULL-STACK WEB APP",
    description:
      "A movie discovery and tracking platform with authentication, reviews, ratings and a personal watchlist.",
    tech: ["JavaScript", "Node.js", "MySQL"],
    link: "https://github.com/Gaurav-Yadav05"
  },
  {
    number: "03",
    name: "GENIUS POINT",
    type: "EDUCATION PLATFORM",
    description:
      "A tuition website concept for organizing courses, student access and educational information.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js"],
    link: "https://github.com/Gaurav-Yadav05"
  },
  {
    number: "04",
    name: "WI-FI P2P CHAT",
    type: "DESKTOP APPLICATION",
    description:
      "A peer-to-peer chat application concept for communication between devices on a local network.",
    tech: ["C++", "Qt", "TCP/UDP"],
    link: "https://github.com/Gaurav-Yadav05"
  }
];

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    let width = 0;
    let height = 0;

    const mouse = { x: -1000, y: -1000, active: false };

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(150, Math.floor((width * height) / 9500));

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 0.6,
        hue: Math.random() > 0.5 ? 275 : 165
      }));
    }

    function moveMouse(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    }

    function leaveMouse() {
      mouse.active = false;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && distance < 145 && distance > 0) {
          const force = (145 - distance) / 145;
          p.x += (dx / distance) * force * 2.2;
          p.y += (dy / distance) * force * 2.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, 0.85)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const lx = p.x - other.x;
          const ly = p.y - other.y;
          const lineDistance = Math.sqrt(lx * lx + ly * ly);

          if (lineDistance < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle =
              `rgba(155, 105, 255, ${0.13 * (1 - lineDistance / 85)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      if (mouse.active) {
        const glow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0, mouse.x, mouse.y, 190
        );
        glow.addColorStop(0, "rgba(127, 65, 255, 0.07)");
        glow.addColorStop(1, "rgba(127, 65, 255, 0)");

        ctx.fillStyle = glow;
        ctx.fillRect(mouse.x - 190, mouse.y - 190, 380, 380);
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseleave", leaveMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseleave", leaveMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}<span className="accent-dot">.</span></h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default function App() {
  return (
    <div className="portfolio">
      <ParticleBackground />

      <header className="navbar">
        <a className="brand" href="#home">GY<span>.</span></a>

        <nav>
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-cta" href="#contact">Let's talk <span>↗</span></a>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="status">
              <span className="status-light" />
              COMPUTER SCIENCE STUDENT · INDIA
            </div>

            <p className="hero-hello">HELLO, I'M</p>
            <h1>Gaurav <span>  </span></h1>

            <h2 className="hero-role">
              Full-Stack Developer
              <span className="role-divider"> / </span>
              Backend Focused
            </h2>

            <p className="hero-description">
              Full-Stack Developer specializing in backend systems, REST APIs, and scalable applications.

            </p>
            Stack: Node.js · Express.js · MySQL · React.js · JavaScript · Python · C++

            <div className="hero-buttons">
              <a className="button button-primary" href="#projects">
                Explore my work <span>↗</span>
              </a>
              <a className="button button-secondary" href="#contact">
                Get in touch
              </a>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/Gaurav-Yadav05" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <span />
              <a href="www.linkedin.com/in/gaurav-yadav-15b002352" target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <span />
              <a href="#experience">My journey ↓</a>
            </div>
          </div>

          
<div className="hero-art">
  <div className="profile-card">
    <img
      className="profile-photo"
      src="/profile.jpg"
      alt="Gaurav Yadav"
    />

    <div className="profile-caption">
      <div>
        <strong>Gaurav Yadav</strong>
        <span>Open to Opportunities</span>
      </div>
      <span className="profile-status" />
    </div>
  </div>
</div>


          <div className="floating-card">
            <span className="floating-card-icon">✳</span>
            <div>
              <strong>Always learning</strong>
              <small>Code · Create · Improve</small>
            </div>
            <span className="floating-arrow">↗</span>
          </div>
          <div className="orb-label orb-label-bottom">BASED IN DELHI, INDIA</div>
          

          <a href="#skills" className="scroll-cue">
            <span /> SCROLL TO EXPLORE
          </a>
        </section>

        <section className="skills section-wrap" id="skills">
          <SectionHeading
            eyebrow="MY TOOLKIT"
            title="Skills & technologies"
            text="Tools I use to learn, experiment, and bring ideas to life."
          />
          <div className="skill-grid">
            {skills.map((skill, index) => (
              <div className="skill-chip" key={skill}>
                <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{skill}</span>
                <span className="skill-star">✳</span>
              </div>
            ))}
          </div>
        </section>

        <section className="projects section-wrap" id="projects">
          <SectionHeading
            eyebrow="SELECTED WORK"
            title="Things I've built"
            text="A collection of projects where curiosity meets code. Each one is a chance to solve a problem and learn something new."
          />

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-top">
                  <span className="project-number">{project.number} / PROJECT</span>
                  <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`}>
                    ↗
                  </a>
                </div>

                <div className="project-art">
                  <div className="project-art-grid" />
                  <span className="project-art-mark">
                    {project.number === "01" ? "N." :
                     project.number === "02" ? "M." :
                     project.number === "03" ? "G." : "↔"}
                  </span>
                  <span className="project-art-caption">{project.type}</span>
                </div>

                <div className="project-info">
                  <span className="eyebrow">{project.type}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tech-list">
                    {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                    View repository <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="project-note">
            More experiments and source code on{" "}
            <a href="https://github.com/Gaurav-Yadav05" target="_blank" rel="noreferrer">
              my GitHub profile ↗
            </a>
          </p>
        </section>

        <section className="experience section-wrap" id="experience">
          <SectionHeading
            eyebrow="THE JOURNEY SO FAR"
            title="Experience & milestones"
            text="Learning through building, teamwork, and stepping up to new challenges."
          />

          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-marker">01</div>
              <div className="timeline-content">
                <span className="timeline-date">LEADERSHIP · COLLEGE</span>
                <h3>Tech Head — 9MM Esports Society</h3>
                <p>
                  Help coordinate technical and esports activities, support event
                  execution, and work with the team to create engaging campus experiences.
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">02</div>
              <div className="timeline-content">
                <span className="timeline-date">HACKATHON · NSUT</span>
                <h3>2nd Runner-Up — AI for Humanity</h3>
                <p>
                  Worked with Team Pioneer to develop an AI-focused solution
                  addressing a real-world problem.
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">03</div>
              <div className="timeline-content">
                <span className="timeline-date">EDUCATION · 2024–2028</span>
                <h3>B.Tech, Computer Science & Engineering</h3>
                <p>
                  G.B. Pant DSEU Okhla-1 Campus. Building foundations in
                  software development, data structures, and emerging AI technologies.
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">04</div>
              <div className="timeline-content">
                <span className="timeline-date">LEARNING · MICROSOFT</span>
                <h3>AI & Security Learning</h3>
                <p>
                  Completed Microsoft AI Paathshala learning modules covering
                  security, compliance, identity, and Microsoft security solutions.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="contact section-wrap" id="contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
              <h2>Let's make<br />something <span>great.</span></h2>
              <p>
                Open to learning opportunities, collaborations, and projects
                that turn ambitious ideas into reality.
              </p>
              <a className="button button-primary" href="gauravyadav16709@gmail.com">
                Say hello <span>↗</span>
              </a>
            </div>

            <div className="contact-links">
              <a href="gauravyadav16709@gmail.com">
                <span className="contact-icon">✉</span>
                <span><small>EMAIL ME</small><strong>gauravyadav16709@gmail.com</strong></span>
                <span className="contact-arrow">↗</span>
              </a>
              <a href="https://github.com/Gaurav-Yadav05" target="_blank" rel="noreferrer">
                <span className="contact-icon">⌘</span>
                <span><small>EXPLORE MY CODE</small><strong>GitHub</strong></span>
                <span className="contact-arrow">↗</span>
              </a>
              <a href="www.linkedin.com/in/gaurav-yadav-15b002352" target="_blank" rel="noreferrer">
                <span className="contact-icon">in</span>
                <span><small>LET'S CONNECT</small><strong>LinkedIn</strong></span>
                <span className="contact-arrow">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">GY<span>.</span></a>
        <p>Designed & built with curiosity by Gaurav Yadav.</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}
