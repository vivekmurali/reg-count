var express=require("express"); 
var bodyParser=require("body-parser"); 
const MongoClient = require("mongodb").MongoClient;
const dotenv=require("dotenv");
require('dotenv').config();




const mongoose = require('mongoose'); 
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true}); 
var DB=mongoose.connection; 
DB.on('error', console.log.bind(console, "connection error")); 
DB.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

let port = process.env.PORT || 3000

var app=express();

app.set('view engine', 'ejs');
app.use(bodyParser.json()); 

app.use(express.static(__dirname,'/../public')); 

app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.get('/',(req,res)=>{
    DB.collection('registration').countDocuments().then((count)=>{
        console.log(count);
        res.render('index.ejs',{count:count});
    });
});

app.listen(port);