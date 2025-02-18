import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      required: true,
      unique: true,  
    },
    catDescription: {
      type: String,
      required: true,
    },
    businesses: [{
        type: mongoose.Schema.ObjectId, ref:"businesses",
      }],
  },
  { timestamps: true }
);

const Categories = mongoose.models.categories || mongoose.model("categories", categorySchema);

export default Categories;
