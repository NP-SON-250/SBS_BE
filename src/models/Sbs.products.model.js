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
    },
    status: {
      type: String, enum: ["approved", "not approved"], default: "not approved"  
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
