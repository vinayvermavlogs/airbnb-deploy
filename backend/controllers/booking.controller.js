import Booking from "../model/booking.model.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"


// help in booking one list
export const createBooking = async (req,res) => {
   try {
    // take id of list in params
    let {id} = req.params
    // from body take 3 things
    let {checkIn ,checkOut ,totalRent} = req.body
    // find list by id
    let listing = await Listing.findById(id)
    if(!listing){
        return res.status(404).json({message:"Listing is not found"})
    }
    // if( checking date is greater than check out date it is false);
    if (new Date(checkIn) >= new Date(checkOut)){
        return res.status(400).json({message:"Invaild checkIn/checkOut date"})

    }
    // already booking
    if(listing.isBooked){
        return res.status(400).json({message:"Listing is already Booked"})
    }
    // taking all booking details
    let booking = await Booking.create({
        checkIn,
        checkOut,
        totalRent,
        host:listing.host,
        guest:req.userId,
        listing:listing._id
    })
    await booking.populate("host", "email" );
    // after booking, push the booking in user bookings
    let user = await User.findByIdAndUpdate(req.userId,{
        $push:{booking:listing}
    },{new:true})

    if(!user){
        return res.status(404).json({message:"User is not found"})
    }

    listing.guest=req.userId
    listing.isBooked=true
    // save the  booking list
    await listing.save()
    return res.status(201).json(booking)

   } catch (error) {
    
    return res.status(500).json({message:`booking error ${error}`})
   }
    
}
// owner cancel the booking and mark the false 
export const cancelBooking = async (req,res) => {
    try {
        let {id} = req.params
        let listing = await Listing.findByIdAndUpdate(id,{isBooked:false})
        let user = await User.findByIdAndUpdate(listing.guest,{
            $pull:{booking:listing._id}
        },{new:true})
        if(!user){
            return res.status(404).json({message:"user is not found"})
        }
        return res.status(200).json({message:"booking cancelled"})

    } catch (error) {
        return res.status(500).json({message:"booking cancel error"})
    }
    
}