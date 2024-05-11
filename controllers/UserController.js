const User =require('../models/User/UserModel');
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../config/jwtToken');

// Criando Usuario na Base de Dados
const createUserController = asyncHandler(
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
  const {email,password} = req.body;
  // check if user exists or not 

  const findUser = await User.findOne({email});

  if(findUser && await findUser.isPasswordMatched(password)){
   res.json({
    _id:findUser?._id,
    firstname:findUser?.firstname,
    lastname:findUser?.lastname,
    mobile:findUser?.mobile,
    email:findUser?.email,
    token:generateToken(findUser?._id),
   })
  }else{
    throw new Error('Ivalid Credentials');
  }
});

// Buscando todos os Utilizadores

const getAllUsersController = asyncHandler(async(req,res)=>{
  try{
    const getUsers=await User.find();
    res.json(getUsers);
  }catch(error){
    throw new Error(error);
  }
})


module.exports = {createUserController,loginUserController,getAllUsersController}