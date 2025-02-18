import mongoose from "mongoose";
const productsSchema = new mongoose.Schema(
  {
    prodName: {
      type: String,
      required: true,
      unique: true,  
    },
    image: {
      type: String,
    },
    prodQuantity: {
      type: String,
      required: true,
    },
    unitMeasure: {
        type: String,
        required: true,
      },
    buyPrice: {
      type: String,
      required: true,
    },
    salePrice: {
      type: String,
      required: true,
      unique: true,  
    },
    expDate: {
        type: String,
        required: true, 
    },
    status: {
        type: String,
        required: true, 
    },
    prodFor: {
        type: mongoose.Schema.ObjectId,
        ref: "stocks",
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.products || mongoose.model("products", productsSchema);

export default Product;
