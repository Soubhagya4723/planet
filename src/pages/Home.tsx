import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '../components/Hero';
import { Section, SectionHeader } from '../components/Section';
import { ArrowRight } from 'lucide-react';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '1', title: 'Aether OS', type: 'SaaS Platform', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: 'Nexus Finance', type: 'FinTech App', image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80' },
  { id: '3', title: 'Hyperion Analytics', type: 'AI Dashboard', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80' },
  { id: '4', title: 'Quantum Engine', type: '3D Web Experience', image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=800&q=80' }
];

const coreTechnologies = [
  "JavaScript", "TypeScript", "Python",
  "Java", "C++", "C#",
  "React", "Next.js", "Node.js",
  "Django", "Spring Boot", ".NET", "Laravel",
  "Three.js", "GSAP",
  "MongoDB", "PostgreSQL",
  "Docker", "AWS",
  "Git", "Figma"
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Stats Counter Animation
    const numbers = gsap.utils.toArray('.stat-num') as HTMLElement[];
    numbers.forEach((num) => {
      const target = parseFloat(num.getAttribute('data-target') || '0');
      
      gsap.to(num, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          once: true
        },
        innerHTML: target,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        onUpdate: function() {
          num.innerHTML = Math.round(this.targets()[0].innerHTML) + '+';
        }
      });
    });

    // 2. Projects Stagger
    gsap.from('.project-card-3d', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: "top 75%",
      },
      y: 100,
      opacity: 0,
      rotationX: -15,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // 3. Tech Ecosystem Fly-In
    const skillNodes = gsap.utils.toArray('.tech-pill') as HTMLElement[];
    skillNodes.forEach((node) => {
      // Random starting positions far outside the center
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 800 + 400; // Fly in from 400px to 1200px away
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;
      
      gsap.fromTo(node, 
        { x: startX, y: startY, opacity: 0, scale: 0.1, rotationZ: (Math.random() - 0.5) * 180 },
        {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            end: "center center",
            scrub: 1.5 // Smooth catchup scrub
          },
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          ease: "power2.out",
        }
      );
    });

  }, { scope: containerRef });

  // 3D Tilt Physics for Project Cards
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    
    // Rotate relative to mouse position
    gsap.to(target, {
      duration: 0.5,
      rotationY: xPct * 20, // max 10 deg rotation
      rotationX: -yPct * 20,
      transformPerspective: 1000,
      ease: "power1.out"
    });
  };

  const handleMouseLeave = (target: HTMLElement) => {
    gsap.to(target, {
      duration: 0.6,
      rotationY: 0,
      rotationX: 0,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div className="home" ref={containerRef}>
      <Hero />

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-container glass-panel">
          <div className="stat-item">
            <h3 className="stat-num text-gradient-accent" data-target="120">0</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-num text-gradient" data-target="80">0</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-num text-gradient" data-target="7">0</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </section>

      {/* Featured Projects with 3D Hover */}
      <Section id="projects-preview">
        <SectionHeader 
          title="Premium Capabilities" 
          subtitle="Explore our finest digital engineering case studies." 
        />
        <div className="projects-grid perspective-grid">
          {projects.map((proj, i) => (
            <NavLink 
              key={i} 
              to={`/projects/${proj.id}`} 
              className="project-card-3d"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="project-inner">
                <div className="project-image">
                  <img src={proj.image} alt={proj.title} />
                  <div className="project-glow"></div>
                </div>
                <div className="project-info glass-panel">
                  <h3>{proj.title}</h3>
                  <p>{proj.type}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="center-actions" style={{ marginTop: '60px', textAlign: 'center' }}>
          <NavLink to="/projects" className="btn btn-primary btn-lg">
            View All Projects <ArrowRight size={18} />
          </NavLink>
        </div>
      </Section>

      {/* Technology Ecosystem Section */}
      <Section id="skills">
        <SectionHeader 
          title="Core Technologies" 
          subtitle="A minimal constellation of the elite tech stack powering our highly-performant digital environments." 
        />
        <div className="unified-ecosystem" ref={skillsRef}>
          {coreTechnologies.map((skill, j) => (
             <div key={j} className="tech-pill">
               <span className="tech-name">{skill}</span>
             </div>
          ))}
        </div>
      </Section>

      {/* About Preview */}
      <Section id="about-preview">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="text-gradient">We engineer precisely what the future demands.</h2>
            <p>
              Planet is a high-end digital innovation studio focused on building scalable platforms, AI powered tools, and immersive web experiences. We fuse art with advanced mathematical computations.
            </p>
            <NavLink to="/about" className="link-with-icon">
              Discover Our Philosophy <ArrowRight size={16} />
            </NavLink>
          </div>
          <div className="about-visual glass-panel">
            <div className="abstract-shape shape-1"></div>
            <div className="abstract-shape shape-2"></div>
            <div className="glass-overlay-shape"></div>
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section id="cta" className="cta-section">
        <div className="cta-content glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="cta-bg-glow"></div>
          <h2 style={{ position: 'relative', zIndex: 2 }}>Let's Build Something <span className="text-gradient-accent">Extraordinary</span></h2>
          <p style={{ position: 'relative', zIndex: 2 }}>Unlock your technological potential. Partner with Planet.</p>
          <NavLink to="/contact" className="btn btn-primary btn-lg" style={{ position: 'relative', zIndex: 2 }}>
            Start a Conversation
          </NavLink>
        </div>
      </Section>
    </div>
  );
}
