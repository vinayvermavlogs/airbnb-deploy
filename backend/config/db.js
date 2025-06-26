// our database connect through moongose
import mongoose from "mongoose";

/*call back function */
const connectDb = async () => {
    try {
        // function will wait and run at my our url in env
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    } catch (error) {
        console.log("db error")
    }
}
export default connectDb