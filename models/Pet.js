import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  breed: String,
  description: String,
  imageUrl: String,       
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Pet", petSchema);
