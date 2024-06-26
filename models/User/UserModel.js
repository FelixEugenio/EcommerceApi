const mongoose = require('mongoose'); // Erase if already required
const bcrypt =require('bcrypt');
const { ObjectId } = require('mongodb');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
    firstname:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    isBlocked:{
      type:Boolean,
      default:false
    },
    cart:{
        type:Array,
        default:[]
    },
    address:[{type: mongoose.Schema.Types.ObjectId, ref:"Address"}],
    wishlist:[{type: mongoose.Schema.Types.ObjectId, ref:"Address"}],
    refreshToken:{
        type:String
    }
    
},{
    timestamps:true,
});

// encryptando password
userSchema.pre('save',async function (next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// criando method passwordMatched
userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);