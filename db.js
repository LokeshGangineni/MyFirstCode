// const mysql=require('mysql');
// import mysql from 'mysql'

// const conn=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Sukanya@1"
//     // database:"nodedb"
// });

// conn.connect((err)=>
// {
//     if(err){
//         console.log( "Database is not created");
//         process.exit(1);
//     }
//     console.log(" connected to Mysql");
//     conn.query("create database if not exists nodedb",function(err,result)
//     {
//         if(err){
//             console.log( "Database is not created");
//             process.exit(1);
//         }
//         console.log("Db created  ");
//     })

//     var creatingTableQuery=`create table if not exists nodelogin(username varchar(240) unique NOT NUll ,password varchar(245))`;
//     conn.query(creatingTableQuery,function(err)
//     {
//         if(err) {
//             // console.log("connection failed");
//             // return ;
//             throw "login table is not created";
//         }
//         console.log("table created");
//     });
    
//     var createTableRegister=`create table if not exists Register
//     (
//     firstname varchar(245) not null,
//     lastname varchar(245) not null,
//     email varchar(245) not null unique,
//     password varchar(245) not null,
//     age varchar(245) not null,
//     phone varchar(245) not null,
//     Gender varchar(245) not null
//     ) `;
//      conn.query(createTableRegister,(err)=>
//     {
//         if(err) return "table not created err";
//         console.log("register table created");
//     })
//     // var insertQuery='INSERT INTO nodelogin (user, password) VALUES (?, ?)'

//     // conn.query(insertQuery,function(err)
//     // {
//     //     if(err) throw err;
//     //     console.log("values inserted ");
//     // })
// });
// module.exports=conn;

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Sukanya@1",
    database: process.env.DB_NAME || "nodedb"
});

// 1. Connect to MySQL server (no DB yet)
conn.connect((err) => {
    if (err) {
        console.error("Connection to MySQL failed:", err);
        process.exit(1);
    }

    console.log("✅ Connected to MySQL");

    // 2. Create DB if it doesn't exist
    conn.query("CREATE DATABASE IF NOT EXISTS nodedb", function(err) {
        if (err) {
            console.error("❌ Failed to create DB:", err);
            process.exit(1);
        }
        console.log("✅ Database created or already exists");

        // 3. Switch to that database
        conn.changeUser({ database: 'nodedb' }, function(err) {
            if (err) {
                console.error("❌ Could not switch to database:", err);
                process.exit(1);
            }

            // 4. Create Login Table
            const createLoginTable = `
                CREATE TABLE IF NOT EXISTS nodelogin (
                    username VARCHAR(240) UNIQUE NOT NULL,
                    password VARCHAR(245)
                )
            `;
            conn.query(createLoginTable, function(err) {
                if (err) {
                    console.error("❌ Login table creation failed:", err);
                    process.exit(1);
                }
                console.log("✅ Login table ready");
            });

            // 5. Create Register Table
            const createRegisterTable = `
                CREATE TABLE IF NOT EXISTS Register (
                    firstname VARCHAR(245) NOT NULL,
                    lastname VARCHAR(245) NOT NULL,
                    email VARCHAR(245) NOT NULL UNIQUE,
                    password VARCHAR(245) NOT NULL,
                    age VARCHAR(245) NOT NULL,
                    phone VARCHAR(245) NOT NULL,
                    gender VARCHAR(245) NOT NULL
                )
            `;
            conn.query(createRegisterTable, function(err) {
                if (err) {
                    console.error("❌ Register table creation failed:", err);
                    process.exit(1);
                }
                console.log("✅ Register table ready");
            });

        });
    });
});

module.exports = conn;
