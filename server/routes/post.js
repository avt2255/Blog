import express from 'express'
import Post from "../models/post.js"
const postRouter = express.Router();


//Create post
postRouter.post("/add", async (req, res) => {
    try {
        const { title, description, photo, userName, category } = req.body
        const postData = await Post.create({
            title, description, userName, photo, userName, category
        })
        if (postData) {
            res.status(200).json("post added successfully")
        } else {
            res.status(500).json("post cannot added")
        }
    } catch (error) {
        res.status(500).json({ ERROR: error })
    }
})

//update post
postRouter.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userName === req.body.userName) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json("post cannot updated")
            }
        } else {
            res.status(500).json("update your only account")
        }
    } catch (error) {
        res.status(500).json("cannot find your account")
    }
})

//delete post
postRouter.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userName === req.body.userName) {
            try {
                await post.deleteOne()
                res.status(200).json("post deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(500).json("you can delete only your post")
        }
    } catch (error) {
        res.status(500).json("cannot find your account")
    }
})

//get post
postRouter.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).json("post not found")
    }
})

//get all post
postRouter.get("/", async (req, res) => {
    const userName = req.query.user
    const category = req.query.catName
    try {
        let post;
        if (userName) {
            post = await Post.find({ userName })
        } else if (category) {
            post = await Post.find({
                category: {
                    $in: [category]
                }
            })
        } else {
            post = await Post.find()
        }
        res.status(200).json(post)
    } catch (error) {
        return res.status(500).json("post not found")
    }
})

export default postRouter;