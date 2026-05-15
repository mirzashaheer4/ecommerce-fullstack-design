import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

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

    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $match: { 'paymentInfo.status': 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      recentOrders,
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

// @desc    Get all orders (admin)
// @route   GET /api/admin/orders
export const getAllOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Order.countDocuments(query);

    const revenueAgg = await Order.aggregate([
      { $match: { ...query, 'paymentInfo.status': 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    res.json({ orders, totalCount, totalRevenue });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    next(error);
  }
};
