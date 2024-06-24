import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import {sendEmail} from "./utils/sendEmail.js"
const app = express();
const router = express.Router();

config({path: "./config.env"})

app.use(
    cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST"],
    credentials: true
})
);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// router.get("/", (req,res,next)=>{
//     res.json({success:true, message: "Welcome to ELITE GYM"})
// })
router.post("/send/mail",async(req,res,next)=>{
    const {name, email, message} = req.body;
    if(!name || !email || !message){
        return next(res.status(400).json({
            success:false,
            message:"Please fill all the details"
        }))
    }
    try{
        await sendEmail({
            email:"chlodhsankar@gmail.com",
            subject: "GYM WEBSITE CONTACT",
            message,
            userEmail:email
        })
        res.status(200).json({
            success:true,
            message:"Message sent successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed!! Internal server error"
        })
    }

})

app.use(router)

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening to PORT ${process.env.PORT}`)
})
