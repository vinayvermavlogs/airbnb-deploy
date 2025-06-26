import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controllers/user.controller.js"


let userRouter = express.Router()
// make get request we take user id from isauth .
// check user come in frontend from backend
userRouter.get("/currentuser",isAuth,getCurrentUser)

export default userRouter

