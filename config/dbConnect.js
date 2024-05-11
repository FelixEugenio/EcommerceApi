const {default: mongoose} = require('mongoose')

const dbConnect = () =>{
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log('Database Connect SuccessFully')
    }catch(error){
    console.log('Database Error')
    }
}
module.exports =dbConnect;