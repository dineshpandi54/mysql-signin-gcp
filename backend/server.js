const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"35.224.6.169",
    user:"root",
    password:"1a2b3c4d5e@Dinesh",
    database:"signup"
}) 

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.get('/',(req,res) =>{
    res.json("Server running");
})

app.post('/signup',(req,res)=>{
    const sql ="INSERT INTO login (`name`,`email`,`password`) VALUES (?,?,?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,values,(err,data)=>{
        if(err){
            return res.json(err.message);
        }
        return res.json(data);
    })
})

app.post('/login',(req,res)=>{
    const sql ="SELECT * FROM login WHERE `email` = ?  AND `password` = ?";
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json(err.message);
        }
        if(data.length > 0){
            return res.json("success")
        }else{
            return res.json("Failed")
        }
    })
})

app.listen(4000,()=>{
    console.log("Server is running on port 4000")
})