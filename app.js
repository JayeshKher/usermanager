const express = require("express");
const Path = require("path");
const userModel = require("./models/user");
const user = require("./models/user.js");
const { render } = require("ejs");
const app = express();
const port = 3000;
app.set("view engine","ejs");
app.use(express.static(Path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index");
});
//      CREATE USER
app.post("/create",async (req,res)=>{
     let createdUser = await userModel.create({
        name:req.body.name,
        username:req.body.username,
        image:req.body.image  
    })
    res.redirect("/Users");
});

//      READ ALL USERS
app.get("/Users", async (req,res)=>{
    let users = await userModel.find();
    res.render("show",{users:users});
});

app.listen(port,()=>{
    console.log(`Server running on port : ${port}`);
});