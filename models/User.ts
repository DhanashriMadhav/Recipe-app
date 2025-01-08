import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.model("User", UserSchema)