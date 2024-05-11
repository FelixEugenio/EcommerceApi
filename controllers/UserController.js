const User =require('../models/User/UserModel');

const createUser = async(req,res)=>{

    const {email} = req.body.email;
  
    const findUser = await User.findOne(email);

    if(!findUser){
  //Create USER
  const newUser = await User.create(req.body);
  res.json(newUser);
    }else{
        // User Already Exists
        res.json({
            message:'User Already Exists',
            sucess:false
        })
    }
}

module.exports = {createUser}