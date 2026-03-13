import { NavLink } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo">PLANET</h2>
            <p className="footer-desc">
               the future of digital experiences with minimalist design and scalable architecture.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link"><Twitter size={20} /></a>
              <a href="#" className="social-link"><Linkedin size={20} /></a>
              <a href="#" className="social-link"><Github size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <h4 className="footer-heading">Company</h4>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Resources</h4>
            <NavLink to="/blog">Blog</NavLink>
            <a href="#">Careers</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Get in Touch</h4>
            <a href="mailto:hello@planet.dev" className="contact-email">
              <Mail size={16} /> hello@planet.dev
            </a>
            <p className="contact-address">
              100 Futuristic Way<br/>
              San Francisco, CA 94105
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Planet Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
