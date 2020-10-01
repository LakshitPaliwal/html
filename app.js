const bodyParser=require('body-parser');
const express=require('express');
const session=require('express-session');
const path=require('path');
var app=express()
const port= process.env.PORT || 3000;
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



connection.connect(function(err){
    if(err) throw err;
    console.log('Connected..');
})

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));


app.get('/',function(req,res){
res.sendFile('index.html',{root:__dirname})
});
app.get('/attpage',function(req,res){
res.sendFile('attpage.html',{root:__dirname})
});





app.post('/feedback',function(req,res){
    var sql="insert into feedback(name,email,mobile,gender,city,pincode,state,country,feedbox) values('"+req.body.name+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.gender+"','"+req.body.city+"','"+req.body.pincode+"','"+req.body.state+"','"+req.body.country+"','"+req.body.feedbox+"')";
    connection.query(sql,function(err){
    if(err) throw err;
        else{
    console.log('Record Added Successfully..')
    res.send('record added Successfully')
        }
    });
});

app.get("/signup",function(req,res){
	res.sendFile("signup.html",{root:__dirname});
});
app.get("/registration",function(req,res){
	res.sendFile("registration.html",{root:__dirname});
});

app.post('/reg',function(req,res){
var sql="INSERT INTO users values(null,'"+req.body.username+"','"+req.body.email+"','"+req.body.password+"','"+req.body.phone+"')";
connection.query(sql,function(err){
 	if(err) throw err;
 	 //res.send("inserted succesfull");
 	 // res.sendFile("/loginpage.html",{root:__dirname};
 	 res.redirect("/loginpage2.html");
 });
});
var email;
app.post('/log',function(req,res){
  email=req.body.email;
     var password=req.body.password;
     if(email && password){
        connection.query('SELECT * FROM users WHERE email = ? AND password = ?' ,[email,password],function(error,results,fields)
        {
           if(results.length>0){
               req.session.loggedin=true;
               req.session.email=email;
               res.sendFile('attpage.html',{root:__dirname});
           }
            else
                {
                    res.send('Incorrect Username and/or Password!');
                }
        });
    }
    else{
        res.send('Please enter Username and Password!');
       res.end();
        }
});

app.post('/attendance',function(req,res){

    var sql="insert into attendance(id,email,date,shift,place,time,attend) values(null,'"+email+"','"+req.body.date+"','"+req.body.shift+"','"+req.body.place+"','"+req.body.time+"','"+req.body.attend+"')";
    connection.query(sql,function(err){
    if(err) throw err;
        else{
    // console.log('Record Added Successfully..')
    // res.send('Record Added Successfully  <br> your profile is logout automatic ')
 	 res.redirect("/loginpage2.html");
        }
    });
});




// app.post('/auth',function(req,res){
//     var email=req.body.email;
//     var password=req.body.password;
//     if(email && password){
//         connection.query('SELECT * FROM data WHERE email = ? AND password = ?',[email,password],function(error,results,fields)
//         {
//            if(results.length>0){
//                req.session.loggedin=true;
//                req.session.email=email;
//                res.sendFile('index.html',{root:__dirname});
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
