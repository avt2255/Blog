import express from 'express'
import User from "../models/user.js"
import bcrypt from 'bcrypt';
import Post from "../models/user.js"
const userRouter = express.Router();

userRouter.put("/:id", async (req, res) => {
    console.log(req.body.userId);
    console.log(req.params.id);
    if (req.body.userId === req.params.id) {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            console.log(updateUser);
            res.status(200).json(updateUser)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ERROR: error })
        }
    } else {
        res.status(500).json({
            message: "you can only use your account!"
        })
    }
})


userRouter.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
           const user =  await User.findById(req.params.id)
            try {
                await Post.deleteMany({userName:user.userName})
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("user account deleted")
            } catch (error) {
                console.log(error);
                return res.status(500).json("user not found")
            }
        } catch (error) {
            return res.status(500).json({ ERROR: error })
        }
    } else {
        res.status(500).json({
            message: "you can only delete your account!"
        })
    }
})


userRouter.get("/:id", async (req, res) => {   
            try {
                const user =  await User.findById(req.params.id)
                const {password,...others} = user._doc
                res.status(200).json(others)
            } catch (error) {
                console.log(error);
                return res.status(500).json("user not found")
            }
})

export default userRouter;