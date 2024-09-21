const mysql=require('mysql2')

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'@Root123',
    database:'service_management'
})
con.connect((err)=>{
    if (err) throw err
    console.log("db is created")
})
module.exports=con