const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const stripe = require("stripe")("sk_test_51R1jn4D12XjX1ZdTCVogRWBXFBopKCYI8rEn7z2iMhkFE5sZDEg4El4hI9Y5OPBI2Duo9glS8AG45LhdNwfPtISj00aa7utdxH");
const { v4: uuidv4 } = require("uuid");

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

app.post('/payment', (req, res) => {
    const { product, token } = req.body;
    const idempotencyKey = uuidv4();
  
    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges
          .create(
            {
              amount: product.price,
              currency: "inr",
              customer: customer.id,
              receipt_email: token.email,
              description: product.name,
            },
            { idempotencyKey }
          )
          .then((result) => {
            res.status(200).json({ success: true, redirectUrl: "http://34.66.216.45:80/success" });
          })
          .catch((err) => {
            res.status(500).json({ success: false, redirectUrl: "http://34.66.216.45:80/cancel", error: err.message });
          });
      })
      .catch((err) => {
        console.error("Error:", err);
        res.status(500).send({ error: "Payment processing failed" });
      });
  });

app.listen(4000,()=>{
    console.log("Server is running on port 4000")
})