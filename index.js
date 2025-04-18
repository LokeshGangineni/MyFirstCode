const fs=require('fs')
const express =require('express')
const app= express()
const session=require('express-session');
const port=process.env.PORT ||3000
const db=require('./db')
const path = require('path');
const loginroute =require( './login');
const registerroute=require("./register");


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })); 

app.get('/',(req,res)=>
{
    const data=fs.readFileSync('register.html')
    res.send(data.toString())
    
})
app.use('/',registerroute);

app.use('/',loginroute)
// app.post('/login',(req,res)=>
// {
//     console.log('Login form submitted ✅');
//     const username=req.body.user;
//     const password=req.body.password;
//     const insertQuery= `insert into nodelogin(username,password) values(?,?)`
//     let details=[username,password]
//     db.query(insertQuery,details,(err)=>
//     {
//         if(err){
//             console.log("error occured:", err);
//             return res.send("login failed try to relogin");
//         }
//         console.log("login saved successful");
//         res.redirect('home.html');
//     })
    
// })


app.listen(port,()=>
{
    console.log(`working on ${port}`)
})
