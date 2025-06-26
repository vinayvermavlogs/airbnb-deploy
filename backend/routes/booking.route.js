import express from "express"
import isAuth from "../middleware/isAuth.js"
import { cancelBooking, createBooking } from "../controllers/booking.controller.js"

// booking routes
// user can book or cancel
let bookingRouter = express.Router()

                                 // middleware , controllers
bookingRouter.post("/create/:id",isAuth,createBooking)
bookingRouter.delete("/cancel/:id",isAuth,cancelBooking)

export default bookingRouter
