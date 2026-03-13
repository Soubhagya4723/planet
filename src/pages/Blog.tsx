import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Section } from '../components/Section';
import { Search } from 'lucide-react';
import './Blog.css';

const allPosts = [
  { id: '1', title: 'The Future of Spatial Computing in Enterprise', author: 'Elena Rostova', date: 'Oct 12, 2026', readTime: '5 min read', category: 'Engineering', image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: 'Why Minimalist Design Increases Conversion Rates', author: 'Marcus Wei', date: 'Sep 28, 2026', readTime: '4 min read', category: 'Design', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { id: '3', title: 'Scaling Node.js Microservices on AWS', author: 'David Chen', date: 'Sep 15, 2026', readTime: '8 min read', category: 'Engineering', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80' },
  { id: '4', title: 'The Rise of AI-Powered Data Pipelines', author: 'Sarah Jenkins', date: 'Aug 30, 2026', readTime: '6 min read', category: 'AI & Data', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80' }
];

const categories = ['All', 'Engineering', 'Design', 'AI & Data', 'Company'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog-page">
      <Section id="blog-header">
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gradient"
            style={{ fontSize: '4rem', marginBottom: '24px' }}
          >
            Insights & Engineering
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}
          >
            Thoughts, perspectives, and technical deep-dives from the Planet team.
          </motion.p>
        </div>

        <div className="blog-controls">
          <div className="blog-search glass-panel">
            <Search size={20} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-bar">
            {categories.map((cat, i) => (
              <button 
                key={i}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="blog-grid">
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={post.id}
                >
                  <NavLink to={`/blog/${post.id}`} className="blog-card glass-panel">
                    <div className="blog-img">
                      <img src={post.image} alt={post.title} />
                      <span className="blog-category-badge glass-panel">{post.category}</span>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span>{post.date}</span>
                        <span className="dot"></span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p className="blog-author">By {post.author}</p>
                    </div>
                  </NavLink>
                </motion.div>
              ))
            ) : (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px', color: 'var(--text-secondary)' }}>
                No articles found matching your criteria.
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </Section>
    </div>
  );
}
