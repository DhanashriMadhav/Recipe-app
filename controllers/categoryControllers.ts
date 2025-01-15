import { Request, Response } from "express";
import { findUserById } from "../services/userServices";
import {createNewCategory, findCategory} from "../services/category"



export const createCategory = async(req: Request, res: Response):Promise<void>=>{
    const adminId = req.user?.id
    const {name, description } = req.body
    try {
        //check if all the details are given
        if (!name || !description){
            res.status(400).json({message: "category details(name, description) are required"})
            return
        }
        //check if the user is admin
        const isAdmin = await findUserById(adminId!)
        
        if(isAdmin){
            const checkAdmin = isAdmin.isAdmin
        
            if(checkAdmin == true){
                //check if the recipe existing

                const alreadyExistingCategory = await findCategory(name)
                if(alreadyExistingCategory) {
                    console.log(alreadyExistingCategory)
                    res.status(409).json({error: "category already exist"})
                    return
                }
                //create new category

                const newCategory = await createNewCategory(name, description)

                if(newCategory){
                    res.status(200).json({message: "category added successfully", data: newCategory})
                    return
                }
            }else{
                res.status(400).json({error: "only admins can add a new category"})
                return 
            }
            res.status(400).json({error: "user not found"})
            return
        }
       
          
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false,
            message: "Internal server error",})
            return
    }

}