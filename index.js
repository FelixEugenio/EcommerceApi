const express = require('express');
const app = express()
const authRouter=require('./routes/UserRoutes');
const dotenv = require('dotenv').config()
const PORT = process.env || 4000;
const dbConnect = require('./config/dbConnect');

dbConnect();

app.use(express.json())
app.use(authRouter);
app.listen(5000,()=>{
    console.log(`Server is Runnig at Port`);
})


