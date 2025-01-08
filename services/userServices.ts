import { User } from "../models/User";

export const findUserByEmail = async(email: string)=>{
    return await User.findOne({email})
}

export const addNewUser = async(email: string, password: string, isAdmin: boolean = false )=>{
    const newUser = new User({email, password, isAdmin})
    await newUser.save()
    return newUser
}