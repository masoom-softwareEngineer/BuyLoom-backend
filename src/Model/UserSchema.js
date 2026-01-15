import mongoose, { Schema } from "mongoose";
const Schemauser = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password:{
        type:String,
        required: true
    },
    verified:{
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: Number
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 500000
    }
    

})
const SignupUser = mongoose.model('user',Schemauser)
export default SignupUser;