import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,  
    },
    userPassword: {
      type: String,
      required: true,
    },
    userProfile: {
        type: String,
      },
    workFor: {
        type: mongoose.Schema.ObjectId,
        ref: "businesses",
    },
    userRole: { 
        type: String, enum: ["manager", "admin","cashier", "owner","server", "chef"], default: "owner" 
      },
  },
  { timestamps: true }
);

const Users = mongoose.models.users || mongoose.model("users", usersSchema);

export default Users;
