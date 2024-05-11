const express = require('express');
const app = express()
const authRouter=require('./routes/UserRoutes');
const dotenv = require('dotenv').config()
const PORT = process.env || 4000;
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errors/errorHandler');

dbConnect();

app.use(express.json())

app.use(authRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is Runnig`);
})


