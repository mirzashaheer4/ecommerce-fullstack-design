import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    deliveryInfo: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      country: { type: String, default: 'Pakistan' },
    },
    paymentInfo: {
      stripePaymentIntentId: String,
      status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
      },
      paidAt: Date,
    },
    subtotal: Number,
    shippingCost: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: Number,
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    orderNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    this.orderNumber =
      'ORD-' +
      Date.now().toString().slice(-6) +
      '-' +
      Math.random().toString(36).slice(-3).toUpperCase();
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
