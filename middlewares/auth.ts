import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface DecodedToken {
  user: {
    id: string; 
  };
}

const jwtSecret = process.env.JWT_SECRET_KEY as string;

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Get the token from header
  const token = req.header('authorization');

  // Check if no token
  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    return;
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;

    // Ensure the decoded token matches the expected structure
     req.user = decoded.user;    
      next();
    
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
    return
  } 
};
