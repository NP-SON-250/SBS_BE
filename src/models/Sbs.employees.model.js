import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    idCard: {
      type: String,
      required: true,
    },
    workFor: {
      type: mongoose.Schema.ObjectId,
      ref: "businesses",
      required: true,
    },
  },
  { timestamps: true }
);

const Employees = mongoose.models.employees || mongoose.model("employees", employeesSchema);

export default Employees;
