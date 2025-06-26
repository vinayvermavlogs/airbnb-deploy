import jwt from "jsonwebtoken"
const isAuth = async (req,res,next) => {
// authentican of user token
    try {
        let {token} = req.cookies //take token from cookie
        if(!token){
            res.status(400).json({message:"user doesn't have a token"}) //token not found
        }
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            res.status(400).json({message:"user doesn't have a Validtoken"}) // token of user is not verify 
        }
        req.userId = verifyToken.userId // if token verify we take userid
        next()

    } catch (error) {
        res.status(500).json({message:`isAuth error ${error}`})
        
    }
    
}
export default isAuth