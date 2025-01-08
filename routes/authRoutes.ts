import express from "express";
import  {ValidateRequest}  from "../middlewares/validateRequest";
import {userValidation, loginValidation} from "../validators/userValidator"
import { signUp, login } from "../controllers/userContrller";



const router = express.Router();

router.post("/signUp", ValidateRequest(userValidation),signUp)
router.post("/login", ValidateRequest(loginValidation),login)


export default router;
