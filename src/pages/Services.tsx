import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/Section';
import { Code, Cloud, Cpu, LayoutTemplate, Layers, Database } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { icon: <Code size={36} />, title: 'Web Development', desc: 'Custom enterprise platforms built with React, Node, and modern strict TypeScript stacks.' },
  { icon: <LayoutTemplate size={36} />, title: 'Custom SaaS Platforms', desc: 'Secure, scalable, multi-tenant software-as-a-service architectures built for high availability.' },
  { icon: <Layers size={36} />, title: '3D Web Experiences', desc: 'Interactive scenes, spatial navigation, and visual physics using Three.js and WebGL.' },
  { icon: <Cpu size={36} />, title: 'AI Integration', desc: 'Custom LLM agents, predictive data models, and complex prompt engineering workflows.' },
  { icon: <Database size={36} />, title: 'UI/UX Design', desc: 'Minimalist, conversion-optimized interfaces designed to feel expensive and premium.' },
  { icon: <Cloud size={36} />, title: 'Cloud Infrastructure', desc: 'Highly secure AWS and Google Cloud deployments mapped for enterprise readiness.' }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Top headers reveal
    gsap.from('.reveal-text', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // 3D Stagger Reveal for the grid
    gsap.from('.svc-card', {
      scrollTrigger: {
        trigger: '.services-grid-large',
        start: 'top 85%',
      },
      y: 100,
      opacity: 0,
      rotationX: -15, // Starts slightly tilted backwards
      stagger: 0.15,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  // Custom 3D Tilt Physics for Hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    
    // Maximum rotation angle in degrees
    const maxRot = 15; 

    gsap.to(target, {
      duration: 0.5,
      rotationY: xPct * maxRot,
      rotationX: -yPct * maxRot,
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
    <div className="services-page" ref={containerRef}>
      <Section id="services-header">
         <div className="page-header" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 className="text-gradient reveal-text" style={{ fontSize: '4.5rem', marginBottom: '24px' }}>
            Our Capabilities
          </h1>
          <p className="reveal-text" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            We provide end-to-end digital product creation. From complex machine learning integrations to spatial web environments, we construct intelligent software that performs flawlessly under scale.
          </p>
        </div>

        <div className="services-grid-large perspective-grid">
          {servicesList.map((svc, i) => (
            <div 
              key={i} 
              className="svc-card glass-panel"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="svc-icon">{svc.icon}</div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
              
              {/* Optional: Add a subtle inner glow element on hover via CSS */}
              <div className="svc-card-glow text-gradient-accent"></div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
