import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/database.js"
import authRouter from '../server/routes/auth.js'
import userRouter from '../server/routes/user.js'
import postRouter from '../server/routes/post.js'
import categoryRouter from '../server/routes/category.js'
import multer from 'multer';
import bodyParser from "body-parser"
const app = express()



app.use(express.json())



app.use(bodyParser.urlencoded({ extended: true }));

// Load env variables
dotenv.config()

// Connect to database
connectDB()
//image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images")
    },
    filename: function (req, file, cb) {
      cb(null, "sample.jpg")
    }
  })

const upload = multer({ storage: storage })
app.post("/upload",upload.single("file"),(req,res)=>{
res.status(200).json("File has been uploaded")
})



//API routes
app.use("/api/v1/auth/",authRouter)
app.use("/api/v1/user/",userRouter)
app.use("/api/v1/post/",postRouter)
app.use("/api/v1/category",categoryRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on ${process.env.NODE_ENV}mode on ${PORT}`);
})


