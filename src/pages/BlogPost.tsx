import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import './BlogPost.css';

// Mock post data
const mockPost = {
  title: 'The Future of Spatial Computing in Enterprise Environments',
  author: 'Elena Rostova',
  date: 'Oct 12, 2026',
  readTime: '5 min read',
  image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=1600&q=80',
  content: `
    <h2>Introduction to Spatial Computing</h2>
    <p>Spatial computing is no longer a concept relegated to science fiction or niche gaming hardware. As enterprise operations become increasingly decentralized, the need for cohesive, zero-latency shared environments has never been more critical. Traditional 2D screens are giving way to immersive 3D workspaces that augment rather than replace our physical realities.</p>
    
    <h2>The Role of WebGL and Three.js</h2>
    <p>We leverage frameworks like Three.js and WebGL to create these environments directly in the browser, bypassing the need for heavy native installations. The browser is the universal platform. When we engineer a spatial OS, we are ensuring that any employee, regardless of their device's raw compute power, can access a high-fidelity workspace.</p>
    
    <blockquote>
      "The next era of human-computer interaction won't be defined by screens, but by the spaces we create between them."
    </blockquote>
    
    <h2>Designing for the Z-Axis</h2>
    <p>Designing for spatial computing requires a fundamental shift in UI/UX paradigms. We are no longer limited by the X and Y bounds of a monitor. Information architecture must now consider depth. How does typography behave in 3D space? How do we use lighting and shadow to imply interactivity without relying on heavy textures or skeuomorphism? At Planet, we resolve this through radical minimalism. By paring back the interface, we reduce cognitive load and allow the spatial context itself to provide the necessary affordances.</p>
    
    <h2>The Integration of Real-Time AI</h2>
    <p>Building a 3D interface is only half the equation. Integrating low-latency AI models allows the environment to dynamically respond to the user. From intelligent spatial layout generation to real-time translation agents mapped to avatars, the synergy between AI and spatial design is what truly transforms experimental tech into enterprise utility.</p>
  `
};

export default function BlogPost() {
  // const { id } = useParams();

  return (
    <div className="blog-post">
      <div className="blog-post-header">
        <div className="post-header-content">
          <NavLink to="/blog" className="back-link">
            <ArrowLeft size={20} /> Back to Articles
          </NavLink>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="post-meta-top">
              <span className="meta-item"><Calendar size={16} /> {mockPost.date}</span>
              <span className="meta-item"><Clock size={16} /> {mockPost.readTime}</span>
              <span className="meta-item"><User size={16} /> By {mockPost.author}</span>
            </div>
            
            <h1 className="post-title">{mockPost.title}</h1>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="post-cover-image"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img src={mockPost.image} alt="Article Cover" />
      </motion.div>

      <Section id="post-content">
        <div className="article-body">
          <div dangerouslySetInnerHTML={{ __html: mockPost.content }} />
        </div>
      </Section>
    </div>
  );
}
