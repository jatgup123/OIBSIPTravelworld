import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    user:{
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    tour:{
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required: true
    },
    userEmail: {
      type: String
    },
    tourName:{
        type:String,
        required:true
    },
    fullName: {
      type: String,
      required: true
    },
    guestSize: {
        type:Number,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    bookAt: {
        type:Date,
        required:true
    },
    isPaid: {
        type:Boolean,
        default: true
    },
  },
  { timestamps: true }
);

bookingSchema.pre(/^find/, function(next){
  this.populate('user').populate({
    path:'tour',
    select:'title'
  })
  next();
})

export default mongoose.model("Booking", bookingSchema);