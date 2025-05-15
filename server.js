const express=require("express")
const mongoose=require("mongoose")
const shorturl=require("./models/shorturl")
const app=express()

mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser:true,useUnifiedTopology:true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))

app.get("/",async(req,res)=>{
    const shorturls=await shorturl.find()
    res.render('index',{shorturls:shorturls})
})

app.post('/shorturls',async(req,res)=>{
    await shorturl.create({full:req.body.shorturl})
    res.redirect('/')
})

app.listen(process.env.PORT||3000)