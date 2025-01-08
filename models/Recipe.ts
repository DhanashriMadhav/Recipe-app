import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [String],
    steps: [String],
    // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    category: { type: String},
   
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    createdAt: { type: Date, default: Date.now },
  });


export const Recipe = mongoose.model("Recipe", RecipeSchema)