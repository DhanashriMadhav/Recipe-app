import bcrypt from 'bcrypt'

export const hashedPassword =  async(password: string)=>{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword

}

export const isMatch = async(password: string, passwordDB: string)=>{
    return await bcrypt.compare(password,passwordDB)
}