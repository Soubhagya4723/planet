import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '../components/Section';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import './ProjectDetail.css';

// Using mock data for demonstation (ideally fetched based on ID)
const projectData = {
  id: '1',
  title: 'Aether OS',
  category: 'SaaS Platform',
  overview: 'Aether OS is a minimalist cloud operating system designed to unify fragmented enterprise tools into a single, cohesive spatial interface. It leverages edge computing to deliver zero-latency experiences across distributed global teams.',
  tech: ['React', 'Node.js', 'AWS Web Services', 'WebSockets', 'GraphQL'],
  heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80'
  ],
  results: [
    '400% increase in team productivity metrics',
    'Sub-50ms latency globally',
    'Adopted by 15 Fortune 500 companies within first year'
  ]
};

export default function ProjectDetail() {
  // const { id } = useParams();

  // In a real app we would fetch the exact project by `id` here.
  // Using `projectData` representing the matched project.

  return (
    <div className="project-detail">
      <div className="project-hero">
        <img src={projectData.heroImage} alt={projectData.title} className="hero-img" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <NavLink to="/projects" className="back-link">
            <ArrowLeft size={20} /> Back to Projects
          </NavLink>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="project-category">{projectData.category}</span>
            <h1 className="project-title-large">{projectData.title}</h1>
          </motion.div>
        </div>
      </div>

      <Section id="project-info">
        <div className="project-grid-main">
          <div className="project-main-col">
            <h2>Overview</h2>
            <p className="project-overview-text">{projectData.overview}</p>

            <h2 style={{ marginTop: '60px' }}>Gallery</h2>
            <div className="project-gallery">
              {projectData.gallery.map((img, i) => (
                <img key={i} src={img} alt={`Gallery ${i}`} className="gallery-img glass-panel" />
              ))}
            </div>

            <h2 style={{ marginTop: '60px' }}>Results & Impact</h2>
            <ul className="results-list">
              {projectData.results.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>

          <div className="project-side-col">
            <div className="tech-stack-card glass-panel">
              <h3>Technology Stack</h3>
              <div className="tech-tags-large">
                {projectData.tech.map((t, i) => (
                  <span key={i} className="tech-tag-large">{t}</span>
                ))}
              </div>
            </div>

            <div className="launch-card glass-panel" style={{ marginTop: '32px' }}>
              <h3>Live Project</h3>
              <p>Explore the live platform environment.</p>
              <a href="#" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                Visit Website <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
