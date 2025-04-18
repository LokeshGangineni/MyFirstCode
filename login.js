const fs=require('fs')
const express=require('express')
const router =express.Router();
const db=require('./db');

router.use(express.static('public'))
router.use(express.urlencoded({ extended: true })); 

const login = router.post('/login', (req, res) => {
    console.log('Login form submitted ✅');
    
    const username = req.body.user;
    const password = req.body.password;

    const selectionQuery = `SELECT * FROM register WHERE email = ?`;

    db.query(selectionQuery, [username], (err, results) => {
        if (err) {
            console.log("Error in DB query:", err);
            return res.send("Login failed. Please try again.");
        }

        if (results.length === 0) {
            console.log("Username not found ❌");
             return res.render('login', { errorMsg: 'Username not found.' });
        }

        const user = results[0];
        console.log(user)

        if (user.password === password) {
            console.log("Login successful ✅");
            return res.redirect('/home.html' );
        } else {
            console.log("Password mismatch ❌");
            return res.render('login',{ errorMsg: 'password not found.' });
        }
    });
});

        
    // })
    module.exports=login;