import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import './Home.css';
import { Mail, ArrowRight } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Brand | Latest Trending Electronics";

    const loadFeatured = async () => {
      setLoading(true);
      setError(null);
      const products = await fetchFeaturedProducts();
      if (products.length === 0) {
        setError('Could not load featured products.');
      }
      setFeaturedProducts(products);
      setLoading(false);
    };

    loadFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-content">
          <div className="hero-sidebar">
            <ul className="category-list">
              <li className="active"><Link to="/products">Automobiles</Link></li>
              <li><Link to="/products">Clothes and wear</Link></li>
              <li><Link to="/products">Home interiors</Link></li>
              <li><Link to="/products">Computer and tech</Link></li>
              <li><Link to="/products">Tools, equipments</Link></li>
              <li><Link to="/products">Sports and outdoor</Link></li>
              <li><Link to="/products">Animal and pets</Link></li>
              <li><Link to="/products">Machinery tools</Link></li>
              <li><Link to="/products">More category</Link></li>
            </ul>
          </div>
          <div className="hero-banner">
            <div className="banner-text">
              <h3>Latest trending</h3>
              <h2>Electronic items</h2>
              <Link to="/products" className="learn-more-btn">Learn more</Link>
            </div>
            <img src="https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp" alt="Trending" className="banner-bg" />
          </div>
          <div className="hero-right">
            <div className="user-card">
              <div className="user-info">
                <div className="user-avatar" style={{ backgroundImage: 'url(https://i.pravatar.cc/150?u=emily)', backgroundSize: 'cover', borderRadius: '50%' }}></div>
                <p>Hi, user<br/>let's get stated</p>
              </div>
              <Link to="/register" className="btn-primary full-width" style={{ display: 'block', textAlign: 'center' }}>Join now</Link>
              <Link to="/login" className="btn-outline full-width" style={{ display: 'block', textAlign: 'center' }}>Log in</Link>
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
            {loading ? (
              [1,2,3,4,5].map(i => (
                <div key={i} className="deal-item">
                  <div className="skeleton" style={{ width: 120, height: 120, marginBottom: 12 }}></div>
                  <div className="skeleton skeleton-line medium"></div>
                  <div className="skeleton skeleton-line short"></div>
                </div>
              ))
            ) : (
              featuredProducts.slice(0, 5).map((item) => (
                <Link to={`/products/${item._id}`} key={item._id} className="deal-item">
                  <img src={item.images[0]} alt={item.name} />
                  <p className="deal-name">{item.name}</p>
                  <span className="deal-discount">-25%</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Home and Outdoor Section */}
      <section className="category-grid-section container">
        <div className="grid-container">
          <div className="grid-banner" style={{ backgroundColor: '#F3EFE9' }}>
            <div className="banner-content">
              <h3>Home and outdoor</h3>
              <Link to="/products?category=Home" className="source-now-btn">Source now</Link>
            </div>
          </div>
          <div className="grid-items">
            {[
              { name: 'Soft chairs', price: '19', img: 'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp' },
              { name: 'Sofa & chair', price: '19', img: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp' },
              { name: 'Kitchen dishes', price: '19', img: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp' },
              { name: 'Smart watches', price: '19', img: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp' },
              { name: 'Kitchen mixer', price: '39', img: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp' },
              { name: 'Plant pots', price: '19', img: 'https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/thumbnail.webp' },
              { name: 'Coffee maker', price: '19', img: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/thumbnail.webp' },
              { name: 'Table lamp', price: '19', img: 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp' },
            ].map((item, i) => (
              <Link to="/products" key={i} className="grid-item">
                <div className="item-text">
                  <h4>{item.name}</h4>
                  <p>From USD {item.price}</p>
                </div>
                <img src={item.img} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Items */}
      <section className="recommended-section container">
        <h3>Recommended items</h3>
        <div className="recommended-grid">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} variant="grid" />
            ))
          ) : error ? (
            <p style={{ color: 'var(--color-text-muted)', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              {error}
            </p>
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} variant="grid" />
            ))
          )}
        </div>
      </section>

      {/* Send Quotes Banner */}
      <section className="quotes-banner container">
        <div className="quotes-content">
          <div className="quotes-text">
            <h2>An easy way to send requests to all suppliers</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
          </div>
          <form className="quotes-form" onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent successfully!'); }}>
            <h3>Send quote to suppliers</h3>
            <input type="text" placeholder="What item you need?" required />
            <textarea placeholder="Type more details" rows="3" required></textarea>
            <div className="form-row">
              <input type="text" placeholder="Quantity" required />
              <select><option>Pcs</option></select>
            </div>
            <button type="submit" className="btn-primary">Send inquiry</button>
          </form>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container newsletter-content">
          <h3>Subscribe on our newsletter</h3>
          <p>Get daily news on upcoming offers from many suppliers all over the world</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
            <div className="input-wrapper">
              <Mail size={20} color="#8B96A5" />
              <input type="email" placeholder="Email" required />
            </div>
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
