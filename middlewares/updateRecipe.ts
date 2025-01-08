interface RecipeData {
    title?: string;
    description?: string;
    ingredients?: string[];  // If ingredients is an array of strings
    steps?: string;
    category?: string;
  }
  export const validateRecipeFields = async(data: RecipeData)=>{
    const errors: { [key: string]: string } = {};  
  
    if (data.title && typeof data.title !== 'string') {
      errors.title = 'Title must be a string';
    }
    if (data.description && typeof data.description !== 'string') {
      errors.description = 'description must be a string';
    }
    if (data.ingredients && !Array.isArray(data.ingredients)) {
      errors.ingredients = 'Ingredients must be an array';
    }
    if (data.steps && typeof data.steps !== 'string') {
      errors.steps = 'Instructions must be a string';
    }
    if (data.category && typeof data.category !== 'string') {
      errors.category = 'description must be a string';
    }
    return Object.keys(errors).length > 0 ? errors : null;
  }
  