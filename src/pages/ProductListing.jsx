import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts, searchProducts as searchProductsApi } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import './ProductListing.css';
import { ChevronRight, ChevronDown, ChevronUp, CheckSquare, Square, LayoutGrid, List, X } from 'lucide-react';

const categories = ['Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports & Outdoor', 'Beauty & Health'];
const brandOptions = ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'];
const featureOptions = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'];
const conditionOptions = ['Any', 'Brand new', 'Refurbished', 'Old items'];

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [appliedMinPrice, setAppliedMinPrice] = useState('');
  const [appliedMaxPrice, setAppliedMaxPrice] = useState('');

  useEffect(() => {
    document.title = "Products | Summer Clothing";
  }, []);

  // Lock body scroll when filters drawer is open on mobile
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showFilters]);

  // Load products when any filter, page, or search query changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      const searchQuery = searchParams.get('q');

      try {
        let data;
        if (searchQuery) {
          data = await searchProductsApi(searchQuery, selectedCategory);
          setProducts(data.products || []);
          setTotalCount(data.totalCount || 0);
          setTotalPages(1);
        } else {
          const apiFilters = {
            category: selectedCategory,
            minPrice: appliedMinPrice,
            maxPrice: appliedMaxPrice,
            rating: selectedRating,
            sortBy,
            page: currentPage,
            limit: 12,
          };
          if (selectedBrands.length > 0) apiFilters.brand = selectedBrands.join(',');
          if (selectedFeatures.length > 0) apiFilters.features = selectedFeatures.join(',');
          if (selectedCondition && selectedCondition !== 'Any') apiFilters.condition = selectedCondition;

          data = await fetchAllProducts(apiFilters);
          setProducts(data.products || []);
          setTotalCount(data.totalCount || 0);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        setError('Failed to load products.');
        setProducts([]);
      }

      setLoading(false);
    };

    loadProducts();
  }, [selectedCategory, selectedBrands, selectedFeatures, selectedCondition, selectedRating, sortBy, appliedMinPrice, appliedMaxPrice, currentPage, searchParams]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(prev => prev === category ? '' : category);
    setCurrentPage(1);
  };

  const handlePriceApply = () => {
    setAppliedMinPrice(minPriceInput);
    setAppliedMaxPrice(maxPriceInput);
    setCurrentPage(1);
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
    setCurrentPage(1);
  };

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition === 'Any' ? '' : condition);
    setCurrentPage(1);
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(prev => prev === String(rating) ? '' : String(rating));
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="product-listing-page container page-animate">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span>
        <ChevronRight size={16} />
        <span>Clothings</span>
        <ChevronRight size={16} />
        <span>Men's wear</span>
        <ChevronRight size={16} />
        <span className="current">
          {searchParams.get('q') ? `Search: "${searchParams.get('q')}"` : 'Summer clothing'}
        </span>
      </div>

      <div className="listing-layout">
        <button className="mobile-filter-btn" onClick={() => setShowFilters(true)}>
          Show Filters
        </button>

        {/* Mobile Filter Overlay */}
        <div className={`filter-overlay ${showFilters ? 'open' : ''}`} onClick={() => setShowFilters(false)}></div>

        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${showFilters ? 'mobile-show' : ''}`}>
          
          {/* Mobile Header */}
          <div className="filter-mobile-header">
            <div className="drawer-handle"></div>
            <div className="filter-header-top">
              <h3>Filters</h3>
              <button className="close-filter-btn" onClick={() => setShowFilters(false)}>
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="filter-scroll-content">
            {/* Category */}
          <div className="filter-section">
            <div className="filter-header">
              <h3>Category</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list">
              {categories.map(cat => (
                <li
                  key={cat}
                  className={selectedCategory === cat ? 'active-filter' : ''}
                  onClick={() => handleCategoryFilter(cat)}
                  style={{ cursor: 'pointer' }}
                >
                  {cat}
                </li>
              ))}
              <li className="see-all" onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}>
                {selectedCategory ? 'Clear filter' : 'See all'}
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div className="filter-section border-top">
            <div className="filter-header">
              <h3>Brands</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list checkbox-list">
              {brandOptions.map(brand => (
                <li key={brand} onClick={() => handleBrandToggle(brand)} style={{ cursor: 'pointer' }}>
                  {selectedBrands.includes(brand)
                    ? <CheckSquare size={20} color="#0D6EFD" />
                    : <Square size={20} color="#DEE2E7" />
                  }
                  {brand}
                </li>
              ))}
              <li className="see-all" onClick={() => { setSelectedBrands([]); setCurrentPage(1); }}>
                {selectedBrands.length > 0 ? 'Clear brands' : 'See all'}
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="filter-section border-top">
            <div className="filter-header">
              <h3>Features</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list checkbox-list">
              {featureOptions.map(feature => (
                <li key={feature} onClick={() => handleFeatureToggle(feature)} style={{ cursor: 'pointer' }}>
                  {selectedFeatures.includes(feature)
                    ? <CheckSquare size={20} color="#0D6EFD" />
                    : <Square size={20} color="#DEE2E7" />
                  }
                  {feature}
                </li>
              ))}
              <li className="see-all" onClick={() => { setSelectedFeatures([]); setCurrentPage(1); }}>
                {selectedFeatures.length > 0 ? 'Clear features' : 'See all'}
              </li>
            </ul>
          </div>

          {/* Price Range */}
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
                <input
                  type="number"
                  placeholder="0"
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Max</label>
                <input
                  type="number"
                  placeholder="999999"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                />
              </div>
            </div>
            <button className="btn-outline full-width" style={{ marginTop: '16px' }} onClick={handlePriceApply}>Apply</button>
          </div>

          {/* Condition */}
          <div className="filter-section border-top">
            <div className="filter-header">
              <h3>Condition</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list radio-list">
              {conditionOptions.map(cond => (
                <li key={cond} onClick={() => handleConditionSelect(cond)} style={{ cursor: 'pointer' }}>
                  <span className={`radio ${
                    (cond === 'Any' && !selectedCondition) || selectedCondition === cond ? 'active' : ''
                  }`}></span>
                  {cond}
                </li>
              ))}
            </ul>
          </div>

          {/* Ratings */}
          <div className="filter-section border-top">
            <div className="filter-header">
              <h3>Ratings</h3>
              <ChevronUp size={20} />
            </div>
            <ul className="filter-list checkbox-list">
              {[5, 4, 3, 2].map(r => (
                <li key={r} onClick={() => handleRatingFilter(r)} style={{ cursor: 'pointer' }}>
                  {selectedRating === String(r)
                    ? <CheckSquare size={20} color="#0D6EFD" />
                    : <Square size={20} color="#DEE2E7" />
                  }
                  {'⭐'.repeat(r)}{'☆'.repeat(5 - r)}
                </li>
              ))}
            </ul>
          </div>
          </div> {/* End filter-scroll-content */}

          {/* Mobile Footer */}
          <div className="filter-mobile-footer">
            <button className="clear-all-btn" onClick={() => {
              setSelectedCategory('');
              setSelectedBrands([]);
              setSelectedFeatures([]);
              setSelectedCondition('');
              setSelectedRating('');
              setAppliedMinPrice('');
              setAppliedMaxPrice('');
              setMinPriceInput('');
              setMaxPriceInput('');
            }}>Clear all</button>
            <button className="btn-primary full-width" onClick={() => setShowFilters(false)}>Apply Filters</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="listing-main">
          <div className="listing-controls">
            <div className="results-count">
              {loading ? 'Loading...' : `${totalCount} items`}
              {selectedCategory && <> in <strong>{selectedCategory}</strong></>}
              {searchParams.get('q') && <> matching <strong>"{searchParams.get('q')}"</strong></>}
            </div>
            <div className="controls-right">
              <label className="verified-only">
                <CheckSquare size={20} color="#0D6EFD" /> Verified only
              </label>
              <select className="sort-select" value={sortBy} onChange={handleSortChange}>
                <option value="">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Best Rating</option>
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
            {loading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} variant={viewMode} />
              ))
            ) : error ? (
              <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                {error}
              </p>
            ) : products.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                No products found. Try adjusting your filters.
              </p>
            ) : (
              products.map(product => (
                <ProductCard key={product._id} product={product} variant={viewMode} />
              ))
            )}
          </div>

          <div className="pagination">
            <select className="show-select" defaultValue="12">
              <option>Show 10</option>
              <option value="12">Show 12</option>
            </select>
            <div className="page-numbers">
              <button
                className="page-btn"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                <ChevronRight size={18} style={{transform: 'rotate(180deg)'}}/>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="page-btn"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                <ChevronRight size={18} />
              </button>
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
