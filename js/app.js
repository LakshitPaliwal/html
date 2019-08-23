const bodyParser=require('body-parser');
const express=require('express');
//const session=require('express-session');
const path=require('path');
var app=express()
const port= 3000
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'marbledata',
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../myproject'))
app.set('view engine','pug')

connection.connect(function(err){
    if(err) throw err;
    console.log('Connected..');
})
app.get('/',function(req,res){
res.sendFile('homepage.html',{root:__dirname})
});
// app.post('/registered',function(req,res){
//     var sql="insert into data(ID,name,email,password) values(NULL,'"+req.body.name+"','"+req.body.email+"','"+req.body.password+"')";
//     connection.query(sql,function(err){
//     if(err) throw err;
//         else{
//     res.sendFile('registered.html',{root:__dirname});
//     console.log('Record Added Successfully.')
//         }
//     });
// });
// app.use(session({
//     secret:'secret',
//     resave:true,
//     saveUninitialized:true
// }));

// app.post('/auth',function(req,res){
//     var email=req.body.email;
//     var password=req.body.password;
//     if(email && password){
//         connection.query('SELECT * FROM data WHERE email = ? AND password = ?',[email,password],function(error,results,fields)
//         {
//            if(results.length>0){
//                req.session.loggedin=true;
//                req.session.email=email;
//                res.sendFile('homepage.html',{root:__dirname});
//            }
//             else
//                 {
//                     res.send('Incorrect Username and/or Password!');
//                 }
//         });
//     }
//     else{
//         res.send('Please enter Username and Password!');
//        res.end();
//     }});

app.listen(port,()=>console.log(`Example app listening on port ${port}!`));

