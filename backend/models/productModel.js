import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  bestseller: { type: Boolean },
  date: { type: Date, required: true },
});

const productModel = 
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

