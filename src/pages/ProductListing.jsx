import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductListing.css';
import { ChevronRight, ChevronDown, ChevronUp, CheckSquare, Square, LayoutGrid, List } from 'lucide-react';

const ProductListing = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [showFilters, setShowFilters] = useState(false);

  React.useEffect(() => {
    document.title = "Products | Summer Clothing";
  }, []);

  return (
    <div className="product-listing-page container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span>
        <ChevronRight size={16} />
        <span>Clothings</span>
        <ChevronRight size={16} />
        <span>Men's wear</span>
        <ChevronRight size={16} />
        <span className="current">Summer clothing</span>
      </div>

      <div className="listing-layout">
        <button className="mobile-filter-btn" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${showFilters ? 'mobile-show' : ''}`}>
          
          <div className="filter-section">
            <div className="filter-header">
              <h3>Category</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list">
              <li>Mobile accessory</li>
              <li>Electronics</li>
              <li>Smartphones</li>
              <li>Modern tech</li>
              <li className="see-all">See all</li>
            </ul>
          </div>

          <div className="filter-section border-top">
            <div className="filter-header">
              <h3>Brands</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list checkbox-list">
              <li><Square size={20} color="#DEE2E7" /> Samsung</li>
              <li><Square size={20} color="#DEE2E7" /> Apple</li>
              <li><Square size={20} color="#DEE2E7" /> Huawei</li>
              <li><Square size={20} color="#DEE2E7" /> Pocco</li>
              <li><Square size={20} color="#DEE2E7" /> Lenovo</li>
              <li className="see-all">See all</li>
            </ul>
          </div>

          <div className="filter-section border-top">
            <div className="filter-header">
              <h3>Features</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list checkbox-list">
              <li><Square size={20} color="#DEE2E7" /> Metallic</li>
              <li><Square size={20} color="#DEE2E7" /> Plastic cover</li>
              <li><Square size={20} color="#DEE2E7" /> 8GB Ram</li>
              <li><Square size={20} color="#DEE2E7" /> Super power</li>
              <li><Square size={20} color="#DEE2E7" /> Large Memory</li>
              <li className="see-all">See all</li>
            </ul>
          </div>

          <div className="filter-section border-top">
            <div className="filter-header">
              <h3>Price range</h3>
              <ChevronUp size={20} />
            </div>
            <div className="price-slider-visual">
              <div className="slider-track">
                <div className="slider-range"></div>
                <div className="slider-thumb left"></div>
                <div className="slider-thumb right"></div>
              </div>
            </div>
            <div className="price-inputs">
              <div className="input-group">
                <label>Min</label>
                <input type="text" placeholder="0" />
              </div>
              <div className="input-group">
                <label>Max</label>
                <input type="text" placeholder="999999" />
              </div>
            </div>
            <button className="btn-outline full-width" style={{ marginTop: '16px' }}>Apply</button>
          </div>

          <div className="filter-section border-top">
            <div className="filter-header">
              <h3>Condition</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list radio-list">
              <li><span className="radio active"></span> Any</li>
              <li><span className="radio"></span> Refurbished</li>
              <li><span className="radio"></span> Brand new</li>
              <li><span className="radio"></span> Old items</li>
            </ul>
          </div>

          <div className="filter-section border-top">
            <div className="filter-header">
              <h3>Ratings</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list checkbox-list">
              <li><CheckSquare size={20} color="#0D6EFD" /> ⭐⭐⭐⭐⭐</li>
              <li><Square size={20} color="#DEE2E7" /> ⭐⭐⭐⭐☆</li>
              <li><Square size={20} color="#DEE2E7" /> ⭐⭐⭐☆☆</li>
              <li><Square size={20} color="#DEE2E7" /> ⭐⭐☆☆☆</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="listing-main">
          <div className="listing-controls">
            <div className="results-count">
              12,911 items in <strong>Mobile accessory</strong>
            </div>
            <div className="controls-right">
              <label className="verified-only">
                <CheckSquare size={20} color="#0D6EFD" /> Verified only
              </label>
              <select className="sort-select">
                <option>Featured</option>
              </select>
              <div className="view-toggles">
                <button 
                  className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className={`products-container ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} variant={viewMode} />
            ))}
          </div>

          <div className="pagination">
            <select className="show-select">
              <option>Show 10</option>
            </select>
            <div className="page-numbers">
              <button className="page-btn"><ChevronRight size={18} style={{transform: 'rotate(180deg)'}}/></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn"><ChevronRight size={18} /></button>
            </div>
          </div>
        </main>
      </div>

      {/* Newsletter */}
      <section className="newsletter" style={{ marginLeft: '-16px', marginRight: '-16px' }}>
        <div className="container newsletter-content">
          <h3>Subscribe on our newsletter</h3>
          <p>Get daily news on upcoming offers from many suppliers all over the world</p>
          <div className="newsletter-form">
            <div className="input-wrapper">
              <input type="email" placeholder="Email" />
            </div>
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListing;
