const express = require("express");
const app = express()
var session = require('express-session')
const path = require("path")

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });
  
  const helper = require('./helper')
  

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: 'keyboard parrot',
    cookie: {}
  }))

app.get("/", helper.home)
app.get("/register", helper.signinget)
app.post("/register", helper.signinpost)
app.get("/login", helper.loginget)
app.post("/login", helper.loginpost)
app.get("/logout", helper.logout)
app.get("/edit", helper.edit)
app.put("/edit", helper.editpost)
app.get("/delete", helper.deletepost)


app.listen(3000,()=>{
    console.log("hello")
})