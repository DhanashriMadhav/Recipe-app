import { Recipe } from "../models/Recipe";
import { ObjectId } from 'mongodb';

export const existingRecipe = async(title: string)=>{
    return await Recipe.findOne({title})
}

export const AddRecipe = async(title: string, description: string, ingredients: Array<string>, steps: Array<string>, category: string, author: string )=>{
  try {
    const NewRecipe = new Recipe({title, description, ingredients, steps, category, author})
    await NewRecipe.save()
    return NewRecipe
  } catch (error) {
    console.log(error)
  }

}

export const getAllRecipes = async()=>{
  try {
    const allRecipe = await Recipe.find()
  
    return allRecipe
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching recipes');
  }
}

export const findRecipeByName = async(title: string)=>{
  try {
    console.log(title)
    const getRecipeByName = await Recipe.findOne({title})
    return getRecipeByName
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching recipes');
  }
}


export const findRecipeByID = async(id: string)=>{
  try {
   console.log(id)
    const getRecipeByName = await Recipe.findOne({ _id: new ObjectId(id) })
    console.log(getRecipeByName)
    return getRecipeByName
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching recipes');
  }
}


export const updateRecipeInDb = async(recipeId: string, updateData: object)=>{
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updateData, {new: true})
    return updatedRecipe;
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching recipes');
  }
}


export const getAllMyRecipes = async(userId: any)=>{
  try {
   
    const getRecipeByName = await Recipe.find({author: userId})
    console.log(getRecipeByName)
    return getRecipeByName
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching recipes');
  }
}