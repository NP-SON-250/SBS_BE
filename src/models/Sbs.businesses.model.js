import mongoose from "mongoose";
const businessSchema = new mongoose.Schema(
  {
    bsName: {
      type: String,
      required: true,
      unique: true,  
    },
    bsCategory: {
      type: String,
      required: true,
    },
    bsProfile: {
        type: String,
      },
    users: [{
        type: mongoose.Schema.ObjectId, ref:"users",
      }],
  },
  { timestamps: true }
);

const Businesses = mongoose.models.businesses || mongoose.model("businesses", businessSchema);

export default Businesses;
