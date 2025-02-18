import mongoose from "mongoose";
const addressSchema = new mongoose.Schema(
  {
    provence: {
      type: String,
      required: true, 
    },
    district: {
      type: String,
      required: true,
    },
    sector: {
        type: String,
        required: true, 
    },
    cell: {
        type: String,
        required: true,
    },
    village: {
        type: String,
        required: true,
    },
    addressFor: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
  },
  { timestamps: true }
);

const Addresses = mongoose.models.addresses || mongoose.model("addresses", addressSchema);

export default Addresses;
