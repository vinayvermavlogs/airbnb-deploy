import genToken from "../config/token.js"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

// signup function
export const sighUp=async (req,res) => {
    try {
        let {name,email,password} = req.body
        let existUser = await User.findOne({email}) // email is already present in database
        if(existUser){
            return res.status(400).json({message:"User is already exist"})
        }
        // new user create , hash the pass
        let hashPassword = await bcrypt.hash(password,10) // pass make len-10
        let user = await User.create({name , email , password:hashPassword})
        // for user a token is generate by genToken
        let token = await genToken(user._id)
        // this token is valid for 7 days and store in cookie
        res.cookie("token",token,{
            httpOnly:true, //local server 
            secure:true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000


        })
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:`sighup error ${error}`})
    }
    
}
// login function
export const login = async (req,res) => {
    try {
        let {email,password} = req.body
        let user= await User.findOne({email}).populate("listing","title image1 image2 image3 description rent category city landMark")
        if(!user){
            return res.status(400).json({message:"User is not exist"})
        }
        // compare the pass word
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect Password"})
        }
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // convert in milisecond


        })
        return res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json({message:`login error ${error}`})
    }
    
}
//logout function
export const logOut = async (req,res) => {
    try {
        // remove the cookie, token
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        return res.status(500).json({message:`logout error ${error}`})
    }
}
