const User = require('../models/User/UserModel');
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../config/jwtToken');
const {validateMongoDbId} = require('../utils/validateMongodbId');
const {generateRefreshToken} = require('../config/refreshToken');
const jwt = require('jsonwebtoken');

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

const handleRefreshToken = asyncHandler(async(req,res)=>{
const cookie = req.cookies;
console.log(cookie);
if(!cookie?.refreshToken) throw new Error('No Refresh Token In Cookies');
const refreshToken = cookie.refreshToken;
console.log(refreshToken);
const user = await User.findOne({refreshToken});
res.json(user);
if(!user) throw new Error(' No Refresh token present in db or not matched');
jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
  if(err || user.id !== decoded.id){
    throw new Error('There is somenthing with refresh token');
  }else{
    const accessToken = generateToken(user?.id);
    res.json({accessToken});
  }
});
});

// logout funcionalidade
/*
const logoutController = asyncHandler(async(req,res)=>{
const cookie = req.cookies;
if(!cookie?.refreshToken) throw new Error('No Refresh Token In Cookies');
const refreshToken = cookie.refreshToken;
const user = await User.findOne({refreshToken});
if(!user){
res.clearCookie('refreshToken',{
  httpOnly:true,
  secure:true
});
return res.sendStatus(204);
}
await User.findOneAndUpdate(refreshToken,{
  refreshToken:"",
});
res.clearCookie('refreshToken',{
  httpOnly:true,
  secure:true
});
return res.sendStatus(204);
});
*/

const logoutController = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    console.log('Nenhum token de atualização nos cookies');
    throw new Error('Nenhum token de atualização nos cookies');
  }

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    console.log('Usuário não encontrado com o token de atualização fornecido');
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    });
    return res.sendStatus(204); // Sem Conteúdo
  }

  // Atualize o token de atualização do usuário
  await User.findOneAndUpdate(
    { refreshToken },  // Filtro
    { $unset: { refreshToken: "" } }  // Atualização
  );

  console.log('Token de atualização removido do documento do usuário');
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true
  });

  return res.sendStatus(204); // Sem Conteúdo
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
  handleRefreshToken,
  logoutController
}