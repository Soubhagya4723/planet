import type { ReactNode } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = '', id }: SectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Trigger when top of section hits 80% down the viewport
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={`section ${className}`}
      style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}
    >
      {children}
    </section>
  );
};

export const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!headerRef.current) return;
    
    gsap.from(headerRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%"
      }
    });
  }, { scope: headerRef });

  return (
    <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '80px' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--text-primary)' }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>{subtitle}</p>}
    </div>
  );
};
