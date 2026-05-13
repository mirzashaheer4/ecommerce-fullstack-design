import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user's cart
// @route   GET /api/cart
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price images stock'
    );

    if (!cart) {
      return res.json({ cart: { items: [], totalAmount: 0 } });
    }

    res.json({ cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }

    // Check stock
    if (product.stock < quantity) {
      const err = new Error('Not enough stock available');
      err.statusCode = 400;
      throw err;
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity, price: product.price }],
      });
    } else {
      // Check if product already in cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price: product.price });
      }
    }

    await cart.save();

    // Return populated cart
    const populatedCart = await Cart.findById(cart._id).populate(
      'items.product',
      'name price images stock'
    );

    res.json({ cart: populatedCart });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      const err = new Error('Cart not found');
      err.statusCode = 404;
      throw err;
    }

    if (quantity <= 0) {
      // Remove item
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      // Check stock
      const product = await Product.findById(productId);
      if (product && quantity > product.stock) {
        const err = new Error('Not enough stock available');
        err.statusCode = 400;
        throw err;
      }

      const item = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (item) {
        item.quantity = quantity;
      } else {
        const err = new Error('Item not found in cart');
        err.statusCode = 404;
        throw err;
      }
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      'items.product',
      'name price images stock'
    );

    res.json({ cart: populatedCart });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      const err = new Error('Cart not found');
      err.statusCode = 404;
      throw err;
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      'items.product',
      'name price images stock'
    );

    res.json({ cart: populatedCart });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ cart: { items: [], totalAmount: 0 } });
  } catch (error) {
    next(error);
  }
};
