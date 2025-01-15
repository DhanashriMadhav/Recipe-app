import  express from "express";
import { validateToken } from "../middlewares/auth";
import { createCategory } from "../controllers/categoryControllers";

const router = express.Router()

router.post("/createCatogory",validateToken,createCategory )

export default router;