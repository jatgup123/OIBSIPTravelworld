import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

export const createUser = async (req, res) => {
  const newTour = new User(req.body);

  try {
    const savedUser = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to updated. Try again" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete. Try again" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res
      .status(200)
      .json({ success: true, message: "Successfully Found", data: user });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found. Try again" });
  }
};

export const getAllUser = async (req, res) => {
  
  try {
    const users = await User.find({})

      res.status(200).json({
        success: true,
        message: "Successful",
        data: users,
      });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found. Try again" });
  }
};

export const getMya = async(req, res)=>{
  try{
      const bookings = await Booking.find({user: req.userId})

      const tourIds = bookings.map(el=>el.tour.id)

      const tours = await Tour.find({_id: {$in:tourIds}})

      res.status(200).json({success:true, message:'Appointments are getting', data:tours});
  }catch(err){
     res.status(500).json({success:false, message:'Something went wrong, cannot get'});
  }
}