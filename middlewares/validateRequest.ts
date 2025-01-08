import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

export const ValidateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errorMessages,
      });
    } else {
      next(); // Ensure next() is always called when there is no error
    }
  };
};

