import Product from '../models/Product.js';

// @desc    Search products across name, description, category, tags
// @route   GET /api/search?q=term&category=cat
export const searchProducts = async (req, res, next) => {
  try {
    const { q, category } = req.query;

    if (!q) {
      return res.json({ products: [], totalCount: 0 });
    }

    const searchRegex = new RegExp(q, 'i');

    const filter = {
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { tags: searchRegex },
      ],
    };

    if (category) {
      filter.category = { $regex: new RegExp(category, 'i') };
    }

    const products = await Product.find(filter);
    res.json({ products, totalCount: products.length });
  } catch (error) {
    next(error);
  }
};
