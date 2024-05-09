import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"; 
import nodemailer from 'nodemailer';
dotenv.config();

export const register = async(req,res)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newuser = new User({
            username: req.body.username,
            email:  req.body.email,
            password: hash,
            photo: req.body.photo,  
        });
        
        await newuser.save();
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "jjting247@gmail.com",
              pass: "eavl ugre iglm hpyg",
            },
          });
          
          // async..await is not allowed in global scope, must use a wrapper
          async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: "jjting247@gmail.com", // sender address
              to: req.body.email, // list of receivers
              text: `Thank you for the successfull registration ${req.body.username} welcome to the TRAVELWORLD`, 
            });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
          }
          
          main().catch(console.error);
        res.status(200).json({success: true, message:'Successfully created'});

    } catch (err) {
        res.status(500).json({success: false, message:'Failed to create. Try again'});
    }
};

export const login = async(req,res)=>{

       const email = req.body.email
    try {
         const user = await User.findOne({email})
         if(!user){
            return res.status(404).json({success:false, message:'User not found'});
         }     
         const ccp = await bcrypt.compare(req.body.password, user.password);
         
         if(!ccp){
             return res.status(404).json({success:false, message:"Incorrect email or password"});
         }

         const {password, role, ...rest} = user._doc

         const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {expiresIn: "15d"});
         console.log("tok",token);
         
         res.cookie("accessToken", token, {
             httpOnly: true,
             secure: true, 
             expires: token.expiresIn
         }).status(200).json({success: true, message:"successfully login", token, role, data:{...rest}})
         
    } catch (err) {
        res.status(500).json({success: false, message:'Failed to login.'});
    }
};