import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/Section';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  { id: '1', title: 'Aether OS', category: 'SaaS Products', desc: 'A minimalist cloud operating system.', tech: ['React', 'Node.js', 'AWS'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: 'Nexus Finance', category: 'Web Apps', desc: 'Real-time financial dashboard.', tech: ['Vue', 'Python', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80' },
  { id: '3', title: 'Hyperion Analytics', category: 'AI Projects', desc: 'Predictive data analytics tool.', tech: ['React', 'FastAPI', 'PyTorch'], image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80' },
  { id: '4', title: 'Quantum Engine', category: '3D Websites', desc: 'Interactive spatial web environment.', tech: ['Three.js', 'React Fiber', 'GLSL'], image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=800&q=80' },
  { id: '5', title: 'Lumina Health', category: 'Web Apps', desc: 'Telehealth patient management.', tech: ['Next.js', 'GraphQL', 'Prisma'], image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80' },
  { id: '6', title: 'Cortex Vision', category: 'AI Projects', desc: 'Computer vision processing pipeline.', tech: ['Python', 'OpenCV', 'Docker'], image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80' }
];

const categories = ['All', 'Web Apps', 'AI Projects', '3D Websites', 'SaaS Products'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeFilter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeFilter);

  // Initial GSAP Header entry
  useGSAP(() => {
    gsap.from('.reveal-text', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  // GSAP Physics for the grid whenever the filter changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card-full');
      
      // Reset first
      gsap.set(cards, { clearProps: 'all' });
      
      // Stagger random fly-in direction based on index to fulfill user request
      cards.forEach((card, i) => {
        const startX = i % 3 === 0 ? -100 : (i % 3 === 2 ? 100 : 0);
        const startY = i % 3 === 1 ? 100 : 0;
        
        gsap.from(card as HTMLElement, {
          x: startX,
          y: startY,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "back.out(1)",
          delay: i * 0.1
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter]);

  // Premium 3D Mouse Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    
    gsap.to(target, {
      duration: 0.5,
      rotationY: xPct * 15,
      rotationX: -yPct * 15,
      transformPerspective: 1000,
      ease: "power1.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = (target: HTMLElement) => {
    gsap.to(target, {
      duration: 0.8,
      rotationY: 0,
      rotationX: 0,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto"
    });
  };

  return (
    <div className="projects-page" ref={containerRef}>
      <Section id="projects-hero">
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="text-gradient reveal-text" style={{ fontSize: '4.5rem', marginBottom: '24px' }}>
            Our Work
          </h1>
          <p className="reveal-text" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            Explore a curated selection of platforms, applications, and digital experiences we've engineered for forward-thinking organizations globally.
          </p>
        </div>

        <div className="filter-bar reveal-text">
          {categories.map((cat, i) => (
            <button 
              key={i}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid-page" ref={gridRef}>
          {filteredProjects.map((proj) => (
            <NavLink 
              to={`/projects/${proj.id}`} 
              key={proj.id}
              className="project-card-full glass-panel"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="project-card-img">
                <img src={proj.image} alt={proj.title} />
              </div>
              <div className="project-card-content">
                <div className="project-meta">
                  <span className="project-category">{proj.category}</span>
                </div>
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <div className="project-tech">
                  {proj.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </Section>
    </div>
  );
}
