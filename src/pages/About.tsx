import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, SectionHeader } from '../components/Section';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: '2016', title: 'Foundation', desc: 'Planet was founded with a vision to build premium digital experiences.' },
  { year: '2018', title: 'Global Expansion', desc: 'Expanded our client base globally, working with top-tier tech firms.' },
  { year: '2021', title: 'AI Integration', desc: 'Pioneered early adoption of AI implementation in SaaS products.' },
  { year: '2026', title: 'Next-Gen Labs', desc: 'Launched specialized labs for spatial web and 3D experiences.' }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant text reveals
    gsap.from('.reveal-text', {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Vision/Mission Card parallax stagger
    gsap.from('.vm-card', {
      scrollTrigger: {
        trigger: '.vision-mission',
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      rotationX: -10,
      stagger: 0.3,
      duration: 1,
      ease: "power3.out"
    });

    // Timeline staggered scroll
    const timelineItems = gsap.utils.toArray('.timeline-item') as HTMLElement[];
    timelineItems.forEach((item, i) => {
      const direction = i % 2 === 0 ? -50 : 50;
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
        x: direction,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  }, { scope: containerRef });

  return (
    <div className="about-page" ref={containerRef}>
      <Section id="about-hero">
        <div className="page-header">
          <h1 className="text-gradient reveal-text" style={{ fontSize: '4.5rem', marginBottom: '24px', textAlign: 'center' }}>
            Our Story
          </h1>
          <p className="reveal-text" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', textAlign: 'center', lineHeight: '1.8' }}>
            Planet is a digital innovation studio focused on building scalable platforms, AI-powered tools, and immersive web experiences. Our goal is to merge design, technology, and strategy to create impactful digital products that redefine industry standards.
          </p>
        </div>

        <div className="vision-mission">
          <div className="vm-card glass-panel">
            <h3 className="text-gradient-accent">The Mission</h3>
            <p>To engineer scalable, beautiful, and highly performant digital tools that empower modern businesses to operate at their highest potential without technological constraints.</p>
          </div>
          <div className="vm-card glass-panel">
            <h3 className="text-gradient-accent">The Vision</h3>
            <p>We envision a future where digital interfaces blur the line between utility and art, powered by seamless AI integration, invisible architectural complexities, and intuitive spatial design.</p>
          </div>
        </div>
      </Section>

      <Section id="timeline">
        <SectionHeader 
          title="Company Evolution" 
          subtitle="A decade of pushing the boundaries of web architecture and design."
        />
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {timeline.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot glass-panel"></div>
              <div className="timeline-content glass-panel">
                <h3 className="text-gradient-accent">{item.year}</h3>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
