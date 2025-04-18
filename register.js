const fs=require('fs')
const db=require('./db')
const express=require('express');
const router=express.Router();

router.use(express.static('public'));

const register=router.post('/register',(req,res)=>
{
    const {firstname,lastname,email,password,age,phone,gender} =req.body
    const registerObject=[firstname,lastname,email,password ,age,phone ,gender];
    const checkQuery = `SELECT * FROM register WHERE email = ?`;
    const insertQuery=`insert into register (firstname,lastname,email,password,age,phone,gender) values (?,?,?,?,?,?,?)`;
 
    db.query(checkQuery, [email], (err, results) => {
        if (results.length > 0) {
            return res.send("Email already exists");
        } 
        else{
            db.query(insertQuery,registerObject,(err)=>
                {
                    if(err)
                    {
                        return console.log("Error in inserting",err)
                    }
                    console.log("register details inserted successfully")
                    res.render('login')
                })
        }
    });
      
})

module.exports=register;




