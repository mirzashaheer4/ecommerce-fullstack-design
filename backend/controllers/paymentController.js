import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { items, deliveryInfo, couponDiscount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Determine user if logged in
    let userId = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (error) {
        // Ignore invalid token
      }
    }

    let subtotal = 0;
    const validatedItems = [];

    // Recalculate from DB
    for (const item of items) {
      const product = await Product.findById(item.product || item._id);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name}` });
      }
      subtotal += product.price * item.qty;
      validatedItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || product.image || '',
        price: product.price,
        quantity: item.qty
      });
    }

    const discount = couponDiscount || 0;
    const shippingCost = subtotal >= 50 ? 0 : 5;
    const total = subtotal + shippingCost - discount;

    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      metadata: {
        userEmail: deliveryInfo.email,
        itemCount: items.length.toString()
      }
    });

    const order = new Order({
      user: userId,
      items: validatedItems,
      deliveryInfo,
      paymentInfo: {
        stripePaymentIntentId: paymentIntent.id,
        status: 'pending'
      },
      subtotal,
      shippingCost,
      discount,
      total,
      status: 'pending'
    });

    await order.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
      orderNumber: order.orderNumber,
      total,
      subtotal,
      shippingCost,
      discount
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const stripe = getStripe();
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (intent.status === 'succeeded') {
      order.paymentInfo.status = 'paid';
      order.paymentInfo.paidAt = new Date();
      order.status = 'processing';
      await order.save();

      if (order.user) {
        await Cart.findOneAndDelete({ user: order.user });
      }

      res.json({ order, message: 'Payment confirmed' });
    } else {
      order.paymentInfo.status = 'failed';
      await order.save();
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user && order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to view this order' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
