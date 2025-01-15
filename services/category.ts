import {Category} from "../models/Category"

export const createNewCategory = async(name: string, desciption: string)=>{
    try {
        const newCategory = new Category({name,desciption})
        await newCategory.save()
        return newCategory
    } catch (error) {
        console.log(error)
    }
}

export const findCategory = async(name: string)=>{
    try {
        const findCategory  = await Category.findOne({name})
        console.log(name,findCategory)
        return findCategory
       
    } catch (error) {
        console.log(error)
    }
}


