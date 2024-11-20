const express = require("express");
const Path = require("path");
const userModel = require("./models/user");
const user = require("./models/user.js");
const { render } = require("ejs");
const { get } = require("http");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static(Path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});
//      CREATE USER
app.post("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: req.body.name,
    username: req.body.username,
    image: req.body.image,
  });
  res.redirect("/Users");
});
//      READ ALL USERS
app.get("/Users", async (req, res) => {
  let users = await userModel.find();
  res.render("show", { users: users });
});
//      UPDATE USER
app.get(`/Update/:uid`, async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.uid });
  res.render("update", { user });
});
app.post(`/update/:uid`, async (req, res) => {
  // let {name ,username ,image} = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.uid },
    {
      name: req.body.name,
      username: req.body.username,
      image: req.body.image,
    },
    { new: true }
  );
  res.redirect("/Users");
});
app.get(`/delete/:uid`, async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ _id: req.params.uid });
  res.redirect("/Users");
});

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
