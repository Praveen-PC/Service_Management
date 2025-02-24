// const express=require('express')
// const cors=require('cors')
// const bobyparser=require('body-parser')
// const db=require('./model/db')



// const app=express()
// app.use(bobyparser.urlencoded({extended:false}))
// app.use(express.json())

// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:['GET','POST','PUT','DELETE']
// }))


// app.post('/',(req,res)=>{
//     const {company,date,product,type,quantity,solvedquantity=0,remarks,person}=req.body
//      const sql='INSERT INTO service_management.service (company,date,product,type,quantity,solvedquantity,remarks,person) VALUES (?,?,?,?,?,?,?,?)'
//     db.query(sql,[company,date,product,type,quantity,solvedquantity,remarks,person],(err,result)=>{
//         if(err) throw err
//         res.send('value inserted')
//     })
// })


// app.get('/tabledata',(req,res)=>{
//     const sql='SELECT * FROM service_management.service'
//     db.query(sql,(err,result)=>{
//         if (err) throw err
//         res.send(result)
//     })
// })
// app.get('/edit/:id',(req,res)=>{
//     const {id}=req.params
//     const sql='SELECT * FROM service_management.service WHERE id=?'
//     db.query(sql,[id],(err,result)=>{
//         if (err) throw err
//         res.json(result[0
//         ])
//     })
// })

// app.put('/update/:id',(req,res)=>{
//     const {id}=req.params
//     const {company,date,product,type,quantity,solvedquantity,remarks,person}=req.body
//     const previousquantity='SELECT solvedquantity FROM service_management.service WHERE id = ?';
//     db.query(previousquantity,[id],(err,result)=>{
//         const prevquantity=result[0].solvedquantity ||0
//         const total=parseFloat(prevquantity)+parseFloat(solvedquantity)
//         const sql='UPDATE service_management.service SET company=?,date=?,product=?,type=?,quantity=?,solvedquantity=?,remarks=?,person=? WHERE id=? '
//         console.log(req.body)
//         db.query(sql,[company,date,product,type,quantity,total,remarks,person,id],(err,result)=>{
//             if (err) throw err
//         })
//     }) 
// })

// app.delete('/delete/:id',(req,res)=>{
//     const {id}=req.params
//     const sql='DELETE FROM service_management.service WHERE id=?'
//     db.query(sql,[id],(err,result)=>{
//         if (err) throw err
//     })
// })
// const PORT=8000
// app.listen(PORT,(err)=>{
//     if (err) throw err
//     console.log(`server running on ${PORT}`)
// })

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./model/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"] }));

// Add a new service entry
app.post("/", (req, res) => {
  const { company, date, motorName, motorType, product, type, quantity, solvedQuantity = 0, remarks, person } = req.body;

  const sql =
    "INSERT INTO service_management.service (company, date, motorname, motortype, product, type, quantity, solvedquantity, remarks, person) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [company, date, motorName, motorType, product, type, quantity, solvedQuantity, remarks, person],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Failed to insert data.");
      } else {
        res.send("Value inserted successfully.");
      }
    }
  );
});

// Fetch all entries
app.get("/tabledata", (req, res) => {
  const sql = "SELECT * FROM service_management.service";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Failed to fetch data.");
    } else {
      res.send(result);
    }
  });
});

// Update an entry
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { company, date, motorName, motorType, product, type, quantity, solvedQuantity, remarks, person } = req.body;

  const sql = `
    UPDATE service_management.service
    SET company = ?, date = ?, motorname = ?, motortype = ?, product = ?, type = ?, quantity = ?, solvedquantity = solvedquantity + ?, remarks = ?, person = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [company, date, motorName, motorType, product, type, quantity, solvedQuantity, remarks, person, id],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        res.status(500).send("Failed to update data.");
      } else {
        res.send("Value updated successfully.");
      }
    }
  );
});

// Delete an entry
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM service_management.service WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Failed to delete data.");
    } else {
      res.send("Value deleted successfully.");
    }
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

