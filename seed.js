import mongoose from "mongoose";
import Pet from "./models/Pet.js";

await mongoose.connect("mongodb://127.0.0.1:27017/pet_adoption");

await Pet.insertMany([
  {
    name: "Milo",
    age: 2,
    breed: "Golden Retriever",
    imageUrl: "/images/dog1.jpeg"
  },
  {
    name: "Bella",
    age: 1,
    breed: "Poodle Mix",
    imageUrl: "/images/dog2.jpeg"
  },
    {
    name: "Rocky",
    age: 3,
    breed: "German Shepherd",
    imageUrl: "/images/dog12.png"
    }
]);

console.log("Seed data inserted");
process.exit();
