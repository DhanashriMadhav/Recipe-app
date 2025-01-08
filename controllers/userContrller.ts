import { Request, Response } from "express";

import { findUserByEmail, addNewUser } from "../services/userServices";
import { hashedPassword, isMatch } from "../utils/hasing";
import { generateToken } from "../services/JWT_authServic";



export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { email, password, isAdmin } = req.body

    try {
        //check if the user already present
        const existingUser = await findUserByEmail(req.body.id)
        if (existingUser) {
            res.status(409).json({ message: 'email already in use' })
            return
        }

        //hashing the password
        const newPassword = await hashedPassword(req.body.password)

        //save the new user
        const newUser = await addNewUser(email, newPassword, isAdmin)
        if (newUser) {
            
            // Generate the JWT token using the generateToken service function    
            const token = await generateToken(newUser.id)

            // sending the token in headers
            res.setHeader('Authorization', `Bearer ${token}`);
    
            // Send the response with the token and user details
            res.status(201).json({ message: 'User created successfully', userDetails: newUser })
            return;
        }

        // Return 500 if user creation fails
         res.status(500).json({ message: 'Failed to create user' });
         return;


    } catch (error) {
        console.error(error);
         res.status(500).json({ message: 'Internal server error' });
         return;
    }
}

export const login = async(req: Request, res: Response): Promise<void> => {
    const{email, password} = req.body
    try {
        const user = await findUserByEmail(email)
          // Check if the user exists
        if(!user){
            res.status(400).json({message:'Invalid creds'})
            return
            
        }
         // Check if the password matches
        const match = await isMatch(password, user.password) 
        if(!match){
            res.status(400).json({message:'Invalid creds'})
            return
        }
     
        // e.g., generating a token and sending the response
        const JWT = await generateToken(user.id)

        
        res.setHeader('Authorization', `Bearer ${JWT}`);

        res.status(200).json({ message: 'Login successful' });
        return  

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}