const express=require('express');
const app=express();
const {Pool}=require('pg');
const cors=require('cors');
app.use(cors());
app.use(express.json());
const pool=new Pool({
  user:'postgres',
  database:'form',
  port:5432,
  password:'akshay123@#$',
  host:'127.0.0.1'
})
app.get('/',async(req,res)=>{
  const form=await pool.query("SELECT * FROM student");
  res.json(form.rows);
})
app.post('/',async(req,res)=>{
  const {firstname,lastname,dob,gender,state,city,address,email,phone}=req.body;
  const forms=await pool.query("INSERT INTO student(firstname,lastname,dob,gender,state,city,address,email,phone)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)RETURNING *",[firstname,lastname,dob,gender,state,city,address,email,phone]);
  res.json(forms.rows[0]);
})
app.listen(3004,()=>{
  console.log('listerning');
})
