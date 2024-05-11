const User =require('../models/User/UserModel');
const asyncHandler = require('express-async-handler');

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
)


module.exports = {createUser}