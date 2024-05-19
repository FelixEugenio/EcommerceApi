const express = require('express');
const app = express()
const authRouter=require('./routes/UserRoutes');
const productRouter=require('./routes/ProductRoutes');
const dotenv = require('dotenv').config()
const PORT = process.env || 4000;
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errors/errorHandler');
const cookieParser = require('cookie-parser');
const morgan =require('morgan');
dbConnect();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
app.use(productRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is Runnig`);
});


