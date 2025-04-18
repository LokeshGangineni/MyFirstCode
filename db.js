const mysql=require('mysql');
// import mysql from 'mysql'

const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sukanya@1",
    database:"nodedb"
});

conn.connect((err)=>
{
    conn.query("create database if not exists nodedb",function(err,result)
    {
        if(err)throw "Database is not created";
        console.log("Db created");
    })

    var creatingTableQuery=`create table if not exists nodelogin(username varchar(240) unique NOT NUll ,password varchar(245))`;
    conn.query(creatingTableQuery,function(err)
    {
        if(err) {
            // console.log("connection failed");
            // return ;
            throw "login tabl eis not created";
        }
        console.log("table created");
    });
    
    var createTableRegister=`create table if not exists Register
    (
    firstname varchar(245) not null,
    lastname varchar(245) not null,
    email varchar(245) not null unique,
    password varchar(245) not null,
    age varchar(245) not null,
    phone varchar(245) not null,
    Gender varchar(245) not null
    ) `;
     conn.query(createTableRegister,(err)=>
    {
        if(err) return "table not created err";
        console.log("register table created");
    })
    // var insertQuery='INSERT INTO nodelogin (user, password) VALUES (?, ?)'

    // conn.query(insertQuery,function(err)
    // {
    //     if(err) throw err;
    //     console.log("values inserted ");
    // })
});
module.exports=conn;

