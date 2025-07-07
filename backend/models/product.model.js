import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true }, // ✅ unique index
  description: { type: String },
  category: { type: String },
  subCategory: { type: String },
  price: { type: Number },
  discount: { type: Number },
  bestseller: { type: Boolean },
  sizes: [{ type: String }],
  image: [String],
  date: { type: Date, default: Date.now }
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
