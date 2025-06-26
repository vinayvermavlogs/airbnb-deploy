import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// help in upload media from server and store in goood form
const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
        // if not file path
        if(!filepath){
            return null}
        const uploadResult = await cloudinary.uploader
        .upload(filepath)
        // after uploading files in cloudinary we delete media from public folder
        fs.unlinkSync(filepath)
        return uploadResult.secure_url


        
    } catch (error) {
        // if error occur at that we also delete from public so that storage not become full.
        fs.unlinkSync(filepath)
        console.log(error)
    }
}

export default uploadOnCloudinary
    
