import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbconnect";
import bodyParser from "body-parser";
import recipeRoutes from "./routes/recipeRoutes"; 
import authRoutes from "./routes/authRoutes"


dotenv.config(); 
const app = express();


// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json());
connectDB()


interface RecipeData {
  title?: string;
  description?: string;
  ingredients?: any[];  // You can specify the type more specifically if needed (e.g., string[] if ingredients are always strings)
  steps?: any[];
  category?: string;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Routes
app.use("/api/recipes", recipeRoutes); 
app.use("/api/user", authRoutes )