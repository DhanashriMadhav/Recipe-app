import Joi from "joi";

export const RecipeSchemaValidate = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
    "any.required": "Title is required.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
    "any.required": "Description is required.",
  }),
  ingredients: Joi.array().items(Joi.string()).messages({
    "array.base": "Ingredients must be an array of strings.",
  }),
  steps: Joi.array().items(Joi.string()).messages({
    "array.base": "Steps must be an array of strings.",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Category is required.",
    "any.required": "Category is required.",
  }),
  author: Joi.string().optional().messages({
    "string.empty": "Author ID should be a valid string.",
  }),
  likes: Joi.number().min(0).default(0).messages({
    "number.base": "Likes must be a number.",
    "number.min": "Likes cannot be less than 0.",
  }),
  comments: Joi.array().items(Joi.string()).messages({
    "array.base": "Comments must be an array of IDs.",
  }),
  createdAt: Joi.date().default(Date.now).messages({
    "date.base": "Invalid date format.",
  }),
});
