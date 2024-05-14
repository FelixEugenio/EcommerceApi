const User = require('../models/User/UserModel');
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../config/jwtToken');
const {validateMongoDbId} = require('../utils/validateMongodbId');
const {generateRefreshToken} = require('../config/refreshToken');

// Criando Usuario na Base de Dados
const createUserController = asyncHandler(
    async(req,res)=>{

        const {email} = req.body.email;
      
        //const findUser = await User.findOne(email);
    
       // if(!findUser){
      //Create USER
      const newUser = await User.create(req.body);
      res.json(newUser);
       // }else{
            // User Already Exists
           throw new Error('User Already Exists');
       // }
    }
);

// Fazendo Login
const loginUserController= asyncHandler(async(req,res)=>{
  const {email,password } = req.body;
  // check if user exists or not 

  const findUser = await User.findOne({email});

  if(findUser && await findUser.isPasswordMatched(password)){
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser?.id, {
      refreshToken:refreshToken,
    },{
      new:true
    }
  );
  res.cookie('refreshToken',refreshToken,{
    httpOnly:true,
    maxAge: 72 * 60 * 60 * 1000,
  });
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

// Lidar com referesh Token 

const handleRefreshToken = asyncHandler((req,res)=>{
const cookie = req.cookies;
console.log(cookie);
if(!cookie?.refreshToken) throw new Error('No Refresh Token In Cookies');
const refreshToken = cookie.refreshToken;
console.log(refreshToken);
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

// Buscando Um Unico Utilizador
const getUserController = asyncHandler(async(req,res)=>{
  try{
    const {id} = req.params;
    const findUser = await User.findById(id);

    if(!findUser){
      throw new Error('User not Found')
    }

    res.json(findUser);
  }catch(error){
    throw new Error(error);
  }
})

//  eliminar um Utilizador
const deleteUserController = asyncHandler(async(req,res)=>{
  try{
    const {id} = req.params;
    validateMongoDbId(id);
    const deleteUser = await User.findByIdAndDelete(id);

    res.json(deleteUser);
  }catch(error){
    throw new Error(error);
  }
})

//  atualizar um Utilizador
const updateUserController = asyncHandler(async(req,res)=>{
  try{
    const {_id} = req.params;
   
    const updateUser = await User.findByIdAndUpdate(_id,{
      firstname:req?.body?.firstname,
      lastname:req?.body?.lastname,
      email:req?.body?.email,
      mobile:req?.body?.mobile
    },{
      new:true
    });

    res.json(updateUser);
  }catch(error){
    throw new Error(error);
  }
})

const blockUserController = asyncHandler(async(req,res)=>{
 const {id} =req.params;
 validateMongoDbId(id);
try{
const block = await User.findByIdAndUpdate(id,{
  isBlocked:true,
},

{
  new:true
});

res.json({
  message:'User Blocked'
})
}catch(error){
 throw new Error(error);
}

});

const unblockUserController = asyncHandler(async(req,res)=>{
  const {id} =req.params;
  validateMongoDbId(id);
  try{
  const unblock = await User.findByIdAndUpdate(id,{
    isBlocked:false,
  },
  
  {
    new:false
  });
  res.json({
    message:'User unBlocked'
  })
  }catch(error){
   throw new Error(error);
  }
});


module.exports = 
{
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserController,
  deleteUserController,
  updateUserController,
  updateUserController,
  blockUserController,
  unblockUserController,
  handleRefreshToken
}