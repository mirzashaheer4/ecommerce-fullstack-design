import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    brand: {
      type: String,
      default: 'Unbranded',
      index: true,
    },
    features: {
      type: [String],
      default: [],
    },
    condition: {
      type: String,
      enum: ['Brand new', 'Refurbished', 'Old items'],
      default: 'Brand new',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
