import SignupUser from "../Model/UserSchema.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
// const resend = new Resend(process.env.RESEND_API_KEY);
export const signupcontroller = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const duplicateEmail = await SignupUser.findOne({ email: email });
    if (duplicateEmail) {
      return res.status(400).json({ message: 'Invalid Email' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    // const verificationcode = Math.floor(100000 + Math.random() * 900000);

    
    const newuser = new SignupUser({
      name,
      email,
      password: hashpassword,
      verified: true,
      // verificationCode: verificationcode
    });

    await newuser.save();
    console.log("User saved successfully ✅");
    // try {
    //   await resend.emails.send({
    //     from: 'onboarding@resend.dev',
    //     to: email,
    //     subject: 'Verification Code',
    //     html: `<h3>Welcome to BuyLoom!</h3>
    //            <p>Your verification code is: <strong>${verificationcode}</strong></p>`
    //   });
    //   console.log("Email sent successfully 📧");
    // } catch (emailError) {
    //   console.error("Email failed but user is saved:", emailError.message);
    //   return res.status(201).json({ 
    //     message: "Account created, but failed to send email. Please contact support.",
    //     userId: newuser._id 
    //   });
    // }
    return res.status(200).json({ 
      message: "Registration successful! You can now login." 
    });
    
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
// export const verifyEmail = async(req,res)=>{
//   try{
//  const {code} = req.body
//  const verifycode = await SignupUser.findOne({verificationCode:code})
//  if(!verifycode){
//   return res.status(400).json({message:"Invalid or expired code"})
//  }
//  verifycode.verified = true;
//  verifycode.verificationCode = null;
//  verifycode.createdAt = undefined
//  await verifycode.save()
//  res.status(200).json({message:'Email verified Successfully'})
 
// }catch(err){
//   res.status(500).json({error: err.message})
// }
// }
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
