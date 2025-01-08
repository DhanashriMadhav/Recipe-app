import Joi, { allow } from "joi";


export const userValidation = Joi.object({
  
    email:Joi.string().required().email({minDomainSegments: 2, tlds: {allow:['com', 'co','net', 'org'] }}).messages({
        "string.empty": "email is required.",
        "any.required": "email is required.",
      }),
    isAdmin: Joi.boolean().default(false).strict().messages({
        "any.required": "isAdmin is required.",
        "boolean.base": "isAdmin must be a boolean."
      }),
    password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/).messages({
        "string.empty": "password is required.",
        "any.required": "password is required.",
          "string.pattern.base": "Password must be 8-30 characters long, include at least one uppercase letter, one lowercase letter, and one digit."
      })
})

export const  loginValidation = Joi.object({
    
    email:Joi.string().required().email({minDomainSegments: 2, tlds: {allow:['com', 'co','net', 'org'] }}).messages({
        "string.empty": "email is required.",
        "any.required": "email is required.",
      }),
      password: Joi.string().required().messages({
        "string.empty": "password is required.",
        "any.required": "password is required.",
         
      })
})