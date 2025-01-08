import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
    createdAt: { type: Date, default: Date.now },
});

export const Category = mongoose.model("Category", CategorySchema)