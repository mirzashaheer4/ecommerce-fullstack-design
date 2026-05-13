const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch featured products for the Home page
 * @returns {Promise<Array>} Array of featured products
 */
export const fetchFeaturedProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products/featured`);
    if (!res.ok) throw new Error('Failed to fetch featured products');
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('fetchFeaturedProducts error:', error);
    return [];
  }
};

/**
 * Fetch all products with filtering, sorting, and pagination
 * @param {Object} filters - { category, minPrice, maxPrice, rating, sortBy, page, limit }
 * @returns {Promise<Object>} { products, totalCount, page, totalPages }
 */
export const fetchAllProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const res = await fetch(`${BASE_URL}/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('fetchAllProducts error:', error);
    return { products: [], totalCount: 0, page: 1, totalPages: 1 };
  }
};

/**
 * Fetch a single product by its ID
 * @param {string} id - Product MongoDB _id
 * @returns {Promise<Object|null>} Product object or null
 */
export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error('fetchProductById error:', error);
    return null;
  }
};

/**
 * Fetch related products (same category, excluding current)
 * @param {string} id - Product MongoDB _id
 * @returns {Promise<Array>} Array of related products
 */
export const fetchRelatedProducts = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}/related`);
    if (!res.ok) throw new Error('Failed to fetch related products');
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('fetchRelatedProducts error:', error);
    return [];
  }
};

/**
 * Search products across name, description, category, tags
 * @param {string} query - Search term
 * @param {string} [category] - Optional category filter
 * @returns {Promise<Object>} { products, totalCount }
 */
export const searchProducts = async (query, category) => {
  try {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);

    const res = await fetch(`${BASE_URL}/search?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to search products');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('searchProducts error:', error);
    return { products: [], totalCount: 0 };
  }
};
