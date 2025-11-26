import Auth from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if(!fullName || !email || !password || !confirmPassword){
            return res.status(400).json({
                message : "Please fill all the fields"
            })
        }

        const isUserExit = await Auth.findOne({email : email});

        if(isUserExit){
            return res.status(400).json({
                message : "User already exist"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                message : "Passwords do not match"
            })
        }

        const salt = 10 ;
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        const newUser = await Auth.create({
            fullName : fullName,
            email : email, 
            password : hashedPassword
        });

        return res.status(201).json({
            message : "User created successfully",
            user : newUser
        });
    }
    catch(error){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message : "Please fill all the fields"
            })
        }

        const user = await Auth.findOne({email : email});
        
        // console.log(user);

        if(!user) {
            return res.status(404).json({
                message : "User does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // console.log(isPasswordCorrect);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message : "Password is incorrect"
            })
        }

        const payload = {
            id : user._id,
            fullName : user.fullName
        }

        // console.log(payload);

        // console.log(process.env.JWT_SECRET);

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        // console.log(token);

        return res.status(200).json({
            message : "Login successful",
            token : token
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}