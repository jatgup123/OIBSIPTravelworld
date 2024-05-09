import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Stripe from 'stripe';
//import loadStripe from '@stripe/stripe-js';

// export const createBooking = async (req, res) => {
//   const newBooking = new Booking(req.body);
//   console.log(newBooking,"8");
//   try {
//     const savedBooking = await newBooking.save();
//     res
//     .status(200)
//     .json({
//       success: true,
//       message: "Your tour is booked",
//       data: savedBooking,
//     });
//       const tour = await Tour.findById(req.params.id);
//       const user = await User.findById(req.body.userId);
  
//       const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types:['card'],
//         mode:'payment',
//         success_url:`${process.env.CLIENT_SITE_URL}/checkout-success`,
//         cancel_url:`${process.env.CLIENT_SITE_URL}/checkout-fail`,
//         customer_email:user.email,
//         client_reference_id:req.params.id,
//         line_items:tour.map(item=>{
//           return{
//             price_data:{
//               currency:'inr',
//               unit_amount:(item.price) * 100,
//               product_data:{
//                 name:item.title,
//                 description:item.desc
//               },
//             },
//             quantity: 1
//           }
//         })
//       })
//       console.log(session,'session')
//       res.json({url:session.url})
      
//   } catch (err) {
//     console.log("err",err)
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


export const createBooking = async (req, res) => {
  //const newBooking = new Booking(req.body);
  //console.log(newBooking, "8");
  try {
    //const savedBooking = await newBooking.save();

    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_configuration: 'pmc_1P6p3ySCJtFPRgZgcT4rVrAK',
      //payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/tours/${tour._id}`,
      customer_email: user.email,
      client_reference_id: req.params.id,
      line_items: [{
        price_data: {
          currency: 'inr',
          unit_amount: tour.price * 100,// Assuming tour.price is in the smallest currency unit (e.g., cents)
          product_data: {
            name: tour.title,
            description: tour.desc
          },
        },
        quantity: req.body.guestSize
      
      }]
    });
    console.log(session, 'session');
    const newbooking = new Booking({
       userId: req.body.userId,
       user: user._id,
       tour: tour._id,
       userEmail: req.body.userEmail,
       tourName: req.body.tourName,
       fullName: req.body.fullName,
       guestSize: req.body.guestSize,
       phone: req.body.phone,
       bookAt: req.body.bookAt,
       session: session.id
    });
    
    const savedBooking = await newbooking.save();
    // Send response only after creating the session
    res.status(200).json({ url: session.url, success: true, message: "Your tour is booked", data: savedBooking, id: session.id });
    
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);
    res.status(200).json({ success: true, message: "successful", data: book });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found"});
  }
};

export const getAllBooking = async (req, res) => {
  
    try {
      const books = await Booking.find();
      res.status(200).json({ success: true, message: "successful", data: books });
    } catch (err) {
      res.status(500).json({ success: false, message: "Internal server error"});
    }
};

export const getCheckoutSession = async (req, res) => {
  const newBooking = new Booking(req.body); 
  try{
    const tour = await Tour.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      mode:'payment',
      success_url:`${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url:`${process.env.CLIENT_SITE_URL}/checkout-fail`,
      customer_email:user.email,
      client_reference_id:req.params.id,
      line_items:tour.map(item=>{
        return{
          price_data:{
            currency:'inr',
            unit_amount:(item.price) * 100,
            product_data:{
              name:item.title,
              description:item.desc
            },
          },
          quantity: 1
        }
      })
    })
    res.json({url:session.url})
    
    const savedBooking = await newBooking.save();
    res
    .status(200)
    .json({
      success: true,
      message: "Successfully paid",
      data: savedBooking,
    });
  }catch(err){
    res.status(500).json({ success: false, message: "Error creating checkout session" });
  }
};