import mongoose from "mongoose";
const stockSchema = new mongoose.Schema(
  {
    stName: {
      type: String,
      required: true, 
    },
    descriptions: {
      type: String,
      required: true,
    },
    stockFor: {
      type: mongoose.Schema.ObjectId,
      ref: "businesses",
      required: true,
    },
    products: [{
        type: mongoose.Schema.ObjectId, 
        ref: "products",
    }],
  },
  { timestamps: true }
);

// Ensure uniqueness of stock name per business
stockSchema.index({ stName: 1, stockFor: 1 }, { unique: true });

const Stocks = mongoose.models.stocks || mongoose.model("stocks", stockSchema);

export default Stocks;
