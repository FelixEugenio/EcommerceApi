const User =require('../models/User/UserModel');
const asyncHandler = require('express-async-handler');

// Criando Usuario na Base de Dados
const createUser = asyncHandler(
    async(req,res)=>{

        const {email} = req.body.email;
      
        const findUser = await User.findOne(email);
    
        if(!findUser){
      //Create USER
      const newUser = await User.create(req.body);
      res.json(newUser);
        }else{
            // User Already Exists
           throw new Error('User Already Exists');
        }
    }
);

// Fazendo Login
const loginUserController= asyncHandler(async(req,res)=>{

})


module.exports = {createUser}