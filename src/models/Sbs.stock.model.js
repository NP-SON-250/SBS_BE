import mongoose from "mongoose";
const stockSchema = new mongoose.Schema(
  {
    stName: {
      type: String,
      required: true,
      unique: true,  
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
        type: mongoose.Schema.ObjectId, ref:"products",
      }],
  },
  { timestamps: true }
);

const Stocks = mongoose.models.stocks || mongoose.model("stocks", stockSchema);

export default Stocks;
