import express from "express"
import { login, logOut, sighUp } from "../controllers/auth.controller.js"

const authRouter = express.Router()
// we can directly go to that page by adding / (just like we make button)
authRouter.post("/signup",sighUp) // controllers.
authRouter.post("/login",login)
authRouter.post("/logout",logOut)
export default authRouter