import { Request } from "express";

declare global {
  namespace Express {
    interface User {
      id: string; // Add other fields if needed
    }

    interface Request {
      user?: User; // Attach user to the Request
    }

    interface RecipeData {
      title?: string;
      description?: string;
      ingredients?: any[];  // You can specify the type more specifically if needed (e.g., string[] if ingredients are always strings)
      steps?: string;
      category?: string;
    }

  
  }



}




