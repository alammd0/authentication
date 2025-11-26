import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
});

const Auth = mongoose.model("Auth", authSchema);
export default Auth;