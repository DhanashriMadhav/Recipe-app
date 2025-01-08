import { Request, Response } from "express";
import { existingRecipe, AddRecipe, getAllRecipes, findRecipeByName, findRecipeByID, updateRecipeInDb, getAllMyRecipes } from "../services/recipe";
import { validateRecipeFields } from "../middlewares/updateRecipe";


// API for creating/adding a new API
export const createRecipe = async (req: Request, res: Response): Promise<void> => {
  const { title, description, ingredients, steps, category } = req.body;


  try {
    //getting user id details from jwt payload
    const { user } = req;
    const author = user?.id ?? '';

    // Check if the recipe already exists
    const existingRec = await existingRecipe(req.body.title)

    if (existingRec) {
      res.status(409).json({ message: 'Recipe already exist' })
      return
    }

    // save the recipe
    const newRecipe = await AddRecipe(title, description, ingredients, steps, category, author)

    // Respond with the saved recipe data
    res.status(201).json({ message: "recipe added successfully", data: newRecipe });
    return


  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};


// API to get list of all recipes
export const getRecipes = async (req: Request, res: Response): Promise<void> => {
  try {

    const allRecipe = await getAllRecipes()

    res.status(200).json({ message: "recipes fetched successfully", "data": allRecipe })
    return

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
}


// API to  get recipe from name
export const getRecipeByName = async (req: Request, res: Response): Promise<void> => {

  try {
    const title = req.body.title
    // check if the request body is not empty
    if (!title) {
      res.status(400).json({ message: "Title is required" })
      return
    }

    const recipeName1 = await findRecipeByName(title)

    if (!recipeName1) {
      res.status(404).json({ message: 'Recipe not found' });
      return
    }
    res.status(200).json({ message: "recipes fetched successfully", "data": recipeName1 })
    return

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
}


//API to update the recipe
export const updateRecipeById = async (req: Request, res: Response): Promise<void> => {
  const recipeId = req.query.id as string
  
  const authorId = req.user?.id
  const updateData = req.body
  const allowedFields = ["title", "description", "ingredients", "steps", "category"]
  try {
    //check if id is sent in params
    if (!recipeId || recipeId.length == 0 || recipeId.length < 24 )  {
      res.status(400).json({ error: "invalid Recipe ID" })
      return
    }
    //check if the details are sent in the request body
    if (!updateData || Object.keys(updateData).length === 0) {
      res.status(400).json({ error: "Request body cannot be empty" })
      return
    }
    // check if invalid fields are sent in the request body 

    const invalidFields = Object.keys(updateData).filter((filed) => !allowedFields.includes(filed))
  

    if (invalidFields.length > 0) {
      res.status(400).json({ error: "'Invalid fields provided", invalidFields })
      return
    }
    //check if the given fields are in correct format

    const errors = await validateRecipeFields(updateData)
    if (errors) {
      res.status(400).json({
        success: false,
        message: "shared details are not in correct format",
        errors,
      });
      return
    }
    //check if recipe exist
    const recipe = await findRecipeByID(recipeId)

    if (recipe) {
      //check if the user has required permision to update the recipe
      if (recipe?.author?.toString() != authorId) {
        res.status(403).json({ error: 'You are not authorized to update this recipe' })
        return
      }

      // Update valid fields
      const updatedRecipe = await updateRecipeInDb(recipeId, updateData)
      res.status(200).json({ success: true, message: "Recipe updated successfully", updatedRecipe });
      return

    }
    res.status(404).json({ error: "recipe not found" })
    return

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }

}

// API to get all recipes of a user

export const getRecipesForUser = async(req: Request,res:Response ):Promise<void>=>{

  const userID = req.query.userId as string
  console.log(userID)
  try {

    //check if the userID not empty or null
    if(!userID){
      res.status(400).json({error:"kindly provide the userid"})
      return
    }
    //getting the recipe
    const allMyRecipes = await getAllMyRecipes(userID)

    if (allMyRecipes.length==0){
      res.status(422).json({error: "no recipes listed for your account"})
      return
    }
    res.status(200).json({messge: "recipes fetched succesfully", allMyRecipes})
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }



}