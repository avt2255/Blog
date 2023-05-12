import express from 'express'
import User from "../models/user.js"
import bcrypt from 'bcrypt';
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    try {

        const { userName, email, password, profilePic } = req.body
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const register = await User.create({
            userName,
            email,
            password: hashedPassword,
            profilePic
        })

        if (!register) {
            res.status(500).json({
                success: false,
                message: "registration failed"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "registration successful"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ERROR: error })
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ userName:req.body.userName })
        console.log("user====>",user);
        !user && res.status(500).json({ message: "invalid credentials" })
        if (user) {
           
            const loginData = await bcrypt.compare(req.body.password,user.password)
            console.log("loginData");
            loginData && res.status(200).json({ message: "login successful" })
        }else{
            res.status(500).json({ message: "login unsuccessful" })
            console.log(123);
        }

    } catch (error) {
        res.status(500).json({ ERROR: error })
    }
})



export default authRouter;