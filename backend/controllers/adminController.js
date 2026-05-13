import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 5 } });
    const featuredProductCount = await Product.countDocuments({ isFeatured: true });

    // Category breakdown
    const categoryAgg = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const categoryBreakdown = {};
    categoryAgg.forEach((c) => {
      categoryBreakdown[c._id] = c.count;
    });

    res.json({
      totalProducts,
      totalUsers,
      totalOrders: 0, // placeholder — no orders system yet
      lowStockProducts,
      featuredProductCount,
      categoryBreakdown,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (admin)
// @route   GET /api/admin/users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('name email role createdAt')
      .sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    next(error);
  }
};
