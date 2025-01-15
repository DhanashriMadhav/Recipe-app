import express from "express";
import { createRecipe, getRecipes, getRecipeByName, updateRecipeById, getRecipesForUser } from "../controllers/recipeController";
import  {ValidateRequest}  from "../middlewares/validateRequest";
import { RecipeSchemaValidate } from "../validators/RecipeValidate";
import { validateToken } from "../middlewares/auth";

const router = express.Router();

router.post("/create", validateToken, ValidateRequest (RecipeSchemaValidate), createRecipe);
router.get("/AllRecipes",validateToken,  getRecipes )
router.get("/recipeByName", validateToken, getRecipeByName)
router.put("/updateRecipe/:id", validateToken,updateRecipeById)
router.get("/getRecipesForUser/:userId",validateToken, getRecipesForUser)


export default router;
