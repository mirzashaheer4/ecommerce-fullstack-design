import Product from '../models/Product.js';

// @desc    Get all products with filtering, sorting, pagination
// @route   GET /api/products
export const getAllProducts = async (req, res, next) => {
  try {
    const {
      category,
      brand,
      features,
      condition,
      minPrice,
      maxPrice,
      rating,
      sortBy,
      page = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(category, 'i') };
    }

    if (brand) {
      const brands = brand.split(',').map(b => b.trim());
      filter.brand = { $in: brands.map(b => new RegExp(`^${b}$`, 'i')) };
    }

    if (features) {
      const featureList = features.split(',').map(f => f.trim());
      filter.features = { $in: featureList };
    }

    if (condition && condition !== 'Any') {
      filter.condition = condition;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    let sortOption = {};
    switch (sortBy) {
      case 'price_asc':
        sortOption = { price: 1 };
        break;
      case 'price_desc':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const totalCount = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.json({
      products,
      totalCount,
      page: pageNum,
      totalPages: Math.ceil(totalCount / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// @desc    Get related products (same category, exclude current)
// @route   GET /api/products/:id/related
export const getRelatedProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }

    const products = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    res.json({ products });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};
