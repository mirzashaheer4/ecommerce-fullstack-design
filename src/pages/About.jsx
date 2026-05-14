import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, RotateCcw, Headphones, Users, Package, Award, Star } from 'lucide-react';
import './About.css';

const FEATURES = [
  { icon: Truck, title: 'Free Shipping', desc: 'Free delivery on orders over $50. Fast and reliable worldwide shipping.' },
  { icon: Shield, title: 'Secure Payment', desc: 'All transactions are encrypted and secured with industry-standard protection.' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle-free return policy. No questions asked refund guarantee.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Our dedicated support team is always available to assist you anytime.' },
];

const TEAM = [
  { name: 'Ahmed Khan', role: 'CEO & Founder', avatar: 'A' },
  { name: 'Sara Malik', role: 'Head of Design', avatar: 'S' },
  { name: 'Omar Farooq', role: 'Lead Developer', avatar: 'O' },
  { name: 'Fatima Ali', role: 'Marketing Director', avatar: 'F' },
];

const STATS = [
  { value: 10000, label: 'Products', suffix: '+' },
  { value: 50000, label: 'Customers', suffix: '+' },
  { value: 100, label: 'Brands', suffix: '+' },
  { value: 5, label: 'Star Rating', suffix: '★' },
];

/* Count-up hook */
const useCountUp = (target, duration = 1200, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);
  return count;
};

const StatCard = ({ value, label, suffix }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 1200, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">
        {value >= 1000 ? `${Math.floor(count / 1000)}K` : count}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const About = () => {
  useEffect(() => {
    document.title = 'About Us | Brand eCommerce';
  }, []);

  return (
    <div className="about-page page-animate">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>About Brand</h1>
          <p className="hero-tagline">Your trusted marketplace for quality products</p>
          <p className="hero-story">
            Founded with a passion for connecting people with the products they love, Brand has grown
            from a small startup into a thriving marketplace serving thousands of customers worldwide.
            We believe that shopping should be easy, enjoyable, and accessible to everyone. Our mission
            is to provide an exceptional online shopping experience with curated products, competitive
            prices, and outstanding customer service.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="about-features container">
        <h2>Why Shop With Us</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">
                <f.icon size={28} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container stats-bar">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="about-team container">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {TEAM.map((member) => (
            <div key={member.name} className="team-card">
              <div className="team-avatar">{member.avatar}</div>
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta container">
        <h2>Ready to Start Shopping?</h2>
        <p>Browse thousands of products from verified sellers.</p>
        <Link to="/products" className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default About;
