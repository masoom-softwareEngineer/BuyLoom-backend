import SignupUser from "../Model/UserSchema.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
export const signupcontroller = async (req, res) => {
  try {
    console.log('Signup request recived')
    const { name, email, password } = req.body;
    const duplicateEmail = await SignupUser.findOne({ email: email });
    
    if (duplicateEmail) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const verificatoncode = Math.floor(100000 + Math.random() * 900000);

    const newuser = new SignupUser({
      name,
      email,
      password: hashpassword,
      verified: false,
      verificationCode: verificatoncode
    });

    const saveuser = await newuser.save();
    console.log("User saved successfully ✅");

    // ای میل بھیجنے کا عمل (بغیر await کے تاکہ سرور نہ رکے)
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Your verification code is ${verificatoncode}`,
      html: `<p>Your verification code is <strong>${verificatoncode}</strong></p>`
    }).then(() => {
      console.log("Email sent successfully 📧");
    }).catch((err) => {
      console.log("Email failed but user is saved. Error:", err.message);
    });
return res.status(200).json({ 
  message: "Your registered Successfully. Verification code sent to email" 
});
    
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
export const verifyEmail = async(req,res)=>{
  try{
 const {code} = req.body
 const verifycode = await SignupUser.findOne({verificationCode:code})
 if(!verifycode){
  return res.status(400).json({message:"Invalid or expired code"})
 }
 verifycode.verified = true;
 verifycode.verificationCode = null;
 verifycode.createdAt = undefined
 await verifycode.save()
 res.status(200).json({message:'Email verified Successfully'})
 
}catch(err){
  res.status(500).json({error: err.message})
}
}
export const logincontroller = async(req, res)=>{
  try{
   const {email, password} = req.body
    const findemail = await SignupUser.findOne({email})
    if(!findemail){
      return  res.status(400).json({message:'Invaild Email'})
    }
    const findpassword = await bcrypt.compare(password, findemail.password);
    if(!findpassword){
      return  res.status(400).json({message:'Invaild Password'})

    }
    const token = jwt.sign(
      {id: findemail._id, email: findemail.email},
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    )
    res.status(200).json({message:'Login successful',token})
  }catch(err){
    res.status(500).json({error: err.message})
  }
}
