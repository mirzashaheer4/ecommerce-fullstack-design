import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';
import { Mail, ArrowRight } from 'lucide-react';

const Home = () => {
  React.useEffect(() => {
    document.title = "Brand | Latest Trending Electronics";
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-content">
          <div className="hero-sidebar">
            <ul className="category-list">
              <li className="active">Automobiles</li>
              <li>Clothes and wear</li>
              <li>Home interiors</li>
              <li>Computer and tech</li>
              <li>Tools, equipments</li>
              <li>Sports and outdoor</li>
              <li>Animal and pets</li>
              <li>Machinery tools</li>
              <li>More category</li>
            </ul>
          </div>
          <div className="hero-banner">
            <div className="banner-text">
              <h3>Latest trending</h3>
              <h2>Electronic items</h2>
              <button className="learn-more-btn">Learn more</button>
            </div>
            <img src="https://placehold.co/400x300/e2e8f0/64748b?text=Headphones" alt="Trending" className="banner-bg" />
          </div>
          <div className="hero-right">
            <div className="user-card">
              <div className="user-info">
                <div className="user-avatar"></div>
                <p>Hi, user<br/>let's get stated</p>
              </div>
              <button className="btn-primary full-width">Join now</button>
              <button className="btn-outline full-width">Log in</button>
            </div>
            <div className="offer-card orange">
              <p>Get US $10 off with a new supplier</p>
            </div>
            <div className="offer-card teal">
              <p>Send quotes with supplier preferences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deals and Offers */}
      <section className="deals-section container">
        <div className="deals-container">
          <div className="deals-timer">
            <h3>Deals and offers</h3>
            <p>Hygiene equipments</p>
            <div className="countdown">
              <div className="time-box"><strong>04</strong><span>Days</span></div>
              <div className="time-box"><strong>13</strong><span>Hour</span></div>
              <div className="time-box"><strong>34</strong><span>Min</span></div>
              <div className="time-box"><strong>56</strong><span>Sec</span></div>
            </div>
          </div>
          <div className="deals-items">
            {products.slice(0, 5).map((item) => (
              <div key={item.id} className="deal-item">
                <img src={item.image} alt={item.name} />
                <p className="deal-name">{item.name}</p>
                <span className="deal-discount">-25%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home and Outdoor Section */}
      <section className="category-grid-section container">
        <div className="grid-container">
          <div className="grid-banner" style={{ backgroundColor: '#F3EFE9' }}>
            <div className="banner-content">
              <h3>Home and outdoor</h3>
              <button className="source-now-btn">Source now</button>
            </div>
          </div>
          <div className="grid-items">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="grid-item">
                <div className="item-text">
                  <h4>Soft chairs</h4>
                  <p>From USD 19</p>
                </div>
                <img src={`https://placehold.co/80x80/e2e8f0/64748b?text=Item+${i}`} alt="Item" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Items */}
      <section className="recommended-section container">
        <h3>Recommended items</h3>
        <div className="recommended-grid">
          {products.slice(0, 10).map(product => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>
      </section>

      {/* Send Quotes Banner */}
      <section className="quotes-banner container">
        <div className="quotes-content">
          <div className="quotes-text">
            <h2>An easy way to send requests to all suppliers</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
          </div>
          <div className="quotes-form">
            <h3>Send quote to suppliers</h3>
            <input type="text" placeholder="What item you need?" />
            <textarea placeholder="Type more details" rows="3"></textarea>
            <div className="form-row">
              <input type="text" placeholder="Quantity" />
              <select><option>Pcs</option></select>
            </div>
            <button className="btn-primary">Send inquiry</button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container newsletter-content">
          <h3>Subscribe on our newsletter</h3>
          <p>Get daily news on upcoming offers from many suppliers all over the world</p>
          <div className="newsletter-form">
            <div className="input-wrapper">
              <Mail size={20} color="#8B96A5" />
              <input type="email" placeholder="Email" />
            </div>
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
