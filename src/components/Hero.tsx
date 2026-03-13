import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Hero.css';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline();

    tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from('.hero-title', { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from('.hero-actions .btn', { y: 30, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from('.scroll-indicator', { opacity: 0, duration: 1 }, "-=0.4");
      
    // Parallax effect on scroll
    gsap.to('.hero-content', {
      y: 150,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: heroRef });

  return (
    <section className="hero" ref={heroRef}>
      
      <div className="hero-content">
        <div className="hero-badge class-panel">INNOVATION LABS</div>

        <h1 className="hero-title">
          Engineering the Future of <br/>
          <span className="text-gradient-accent">Digital Experiences</span>
        </h1>

        <p className="hero-subtitle">
          Planet builds next-generation web platforms, AI systems, and immersive digital products for modern companies.
        </p>

        <div className="hero-actions">
          <NavLink to="/projects" className="btn btn-primary">
            View Projects <ArrowRight size={18} />
          </NavLink>
          <NavLink to="/contact" className="btn btn-secondary glass-panel">
            Start a Project
          </NavLink>
        </div>
      </div>

      <div className="scroll-indicator">
        <ChevronDown size={24} color="var(--text-secondary)" className="bounce" />
      </div>
    </section>
  );
};
