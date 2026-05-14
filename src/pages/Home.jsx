import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import './Home.css';
import { Mail, ArrowRight, User } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  const { isAuthenticated, user, logoutUser } = useAuth();

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
    <div className="home-page page-animate">
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
          <div className="hero-banner" style={{ backgroundColor: '#A2D2C9', overflow: 'hidden' }}>
            <div className="banner-text">
              <h3>Latest trending</h3>
              <h2>Electronic items</h2>
              <Link to="/products" className="learn-more-btn">Learn more</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80" alt="Trending" className="banner-bg" style={{ width: '55%', objectFit: 'cover' }} />
          </div>
          <div className="hero-right">
            <div className="user-card">
              {isAuthenticated ? (
                <>
                  <div className="user-info">
                    <div className="user-avatar" style={{ backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '18px', fontWeight: 'bold' }}>
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <p style={{ wordBreak: 'break-word' }}>Hi, {user?.name?.split(' ')[0] || 'User'}<br/>welcome back!</p>
                  </div>
                  <Link to="/profile" className="btn-primary full-width" style={{ display: 'block', textAlign: 'center' }}>My Profile</Link>
                  <button onClick={logoutUser} className="btn-outline full-width" style={{ display: 'block', textAlign: 'center', marginTop: '8px' }}>Log out</button>
                </>
              ) : (
                <>
                  <div className="user-info">
                    <div className="user-avatar" style={{ backgroundColor: '#E3E8EE', color: '#8B96A5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                      <User size={24} />
                    </div>
                    <p>Hi, user<br/>let's get started</p>
                  </div>
                  <Link to="/register" className="btn-primary full-width" style={{ display: 'block', textAlign: 'center' }}>Join now</Link>
                  <Link to="/login" className="btn-outline full-width" style={{ display: 'block', textAlign: 'center', marginTop: '8px' }}>Log in</Link>
                </>
              )}
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
          <div className="grid-banner" style={{ 
            backgroundImage: "url('/images/home_outdoor_banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <div className="banner-content">
              <h3>Home and outdoor</h3>
              <Link to="/products?category=Home" className="source-now-btn">Source now</Link>
            </div>
          </div>
          <div className="grid-items">
            {[
              { name: 'Soft chairs', price: '19', img: 'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png' },
              { name: 'Sofa & chair', price: '19', img: 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png' },
              { name: 'Kitchen dishes', price: '19', img: 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Plate/thumbnail.png' },
              { name: 'Smart watches', price: '19', img: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Watch%20Series%204%20Gold/thumbnail.png' },
              { name: 'Kitchen mixer', price: '100', img: 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Hand%20Blender/thumbnail.png' },
              { name: 'Blenders', price: '39', img: 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/thumbnail.png' },
              { name: 'Home appliance', price: '19', img: 'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/thumbnail.png' },
              { name: 'Coffee maker', price: '10', img: 'https://cdn.dummyjson.com/products/images/home-decoration/Table%20Lamp/thumbnail.png' },
            ].map((item, i) => (
              <Link to="/products" key={i} className="grid-item">
                <div className="item-text">
                  <h4>{item.name}</h4>
                  <p>From{'\n'}USD {item.price}</p>
                </div>
                <img src={item.img} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consumer Electronics Section */}
      <section className="category-grid-section container">
        <div className="grid-container">
          <div className="grid-banner" style={{ 
            backgroundImage: "url('/images/consumer_electronics_banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#1C1C1C'
          }}>
            <div className="banner-content">
              <h3>Consumer electronics and gadgets</h3>
              <Link to="/products?category=Electronics" className="source-now-btn">Source now</Link>
            </div>
          </div>
          <div className="grid-items">
            {[
              { name: 'Smart watches', price: '19', img: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Watch%20Series%204%20Gold/thumbnail.png' },
              { name: 'Cameras', price: '89', img: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/thumbnail.png' },
              { name: 'Headphones', price: '10', img: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Beats%20Studio3%20Wireless/thumbnail.png' },
              { name: 'Smart watches', price: '90', img: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png' },
              { name: 'Gaming set', price: '35', img: 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen/thumbnail.png' },
              { name: 'Laptops & PC', price: '340', img: 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014/thumbnail.png' },
              { name: 'Smartphones', price: '19', img: 'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S10/thumbnail.png' },
              { name: 'Electric kattle', price: '240', img: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png' },
            ].map((item, i) => (
              <Link to="/products" key={i} className="grid-item">
                <div className="item-text">
                  <h4>{item.name}</h4>
                  <p>From{'\n'}USD {item.price}</p>
                </div>
                <img src={item.img} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
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
          <form className="quotes-form" onSubmit={(e) => { e.preventDefault(); showToast('Inquiry sent successfully! We will get back to you soon.', 'success'); e.target.reset(); }}>
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
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); showToast('Subscribed successfully! Welcome aboard.', 'success'); e.target.reset(); }}>
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
