import JWT, { verify, JwtPayload } from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config(); 

const jwtToken = process.env.JWT_SECRET_KEY

if (!jwtToken) {
    throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
  }

//function to return token

export const generateToken = async(id: string): Promise<string>=>{
    const payload = {
        user:{
            id: id
        }
    }

    return new Promise((resolve, reject)=>{
        JWT.sign(payload, jwtToken,{expiresIn: '1h'},(err,token)=>{
            if(err){
                reject('Error generating token')
            }else{
                resolve(token as string)
            }
        })
    })
}


