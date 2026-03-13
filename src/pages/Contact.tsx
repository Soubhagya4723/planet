import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Section } from '../components/Section';
import { Mail, Phone, Send, CheckCircle, Github, Linkedin, Instagram } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elegant Header Reveal
    gsap.from('.reveal-text', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Infocards Slide-In 
    gsap.from('.info-card', {
      x: -50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      delay: 0.4
    });

    // Form Fly-in
    gsap.from('.contact-form-container', {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.6
    });
  }, { scope: containerRef });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/srijitswain99@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page" ref={containerRef}>
      <Section id="contact-header">
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 className="text-gradient reveal-text" style={{ fontSize: '4.5rem', marginBottom: '24px' }}>
            Start a Conversation
          </h1>
          <p className="reveal-text" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            Whether you need a scalable SaaS platform, an immersive 3D experience, or a bespoke AI system, our engineering team is ready to architect your vision.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-card glass-panel">
              <Mail className="info-icon" size={28} />
              <div>
                <h3>Email Us</h3>
                <p>srijitswain99@gmail.com</p>
              </div>
            </div>

            <div className="info-card glass-panel">
              <Phone className="info-icon" size={28} />
              <div>
                <h3>Call Us</h3>
                <p>+91 (Contact Number)</p>
              </div>
            </div>

            <div className="info-card glass-panel">
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Github size={28} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Linkedin size={28} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Instagram size={28} />
                </a>
              </div>
              <div style={{ marginLeft: '12px' }}>
                <h3>Social Profiles</h3>
                <p>Connect with us directly</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container glass-panel">
            {submitted ? (
              <div className="success-message">
                <CheckCircle size={72} color="var(--highlight-glow)" className="mb-4" />
                <h2 className="text-gradient">Message Received</h2>
                <p>Thank you for reaching out. An engineer will be in touch with you shortly.</p>
                <button
                  className="btn btn-secondary glass-panel"
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '32px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                  />
                  <div className="input-glow"></div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@company.com"
                  />
                  <div className="input-glow"></div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your objectives, timeline, and technical requirements..."
                  ></textarea>
                  <div className="input-glow"></div>
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <Send size={18} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
