import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"
let port = process.env.PORT || 6000

let app = express()
app.use(express.json())
app.use(cookieParser())
// this allow post request at host 5173
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// middlewares
app.use("/api/auth", authRouter ) // in authrouter we make router
app.use("/api/user", userRouter )
app.use("/api/listing",listingRouter )
app.use("/api/booking",bookingRouter )


app.listen(port,()=>{
    connectDb() // mongo func call
    console.log("server started") // succfully connect then print this line
})