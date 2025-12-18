import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  breed: String,
  description: String,
  imageUrl: String,       // 存图片路径，如 /images/dog1.jpeg
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Pet", petSchema);
