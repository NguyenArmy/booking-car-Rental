import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true, // bat buoc
        unique: true // duy nhat
    },
    password:{
        type:String,
        required: true, // bat buoc
  
    },
    role:{
        type:String,
        enum:["owner", "user"],
        default:"user"
    },
      image:{
        type:String,
        default:'',
  
    },
},
{
    timestamps: true
}
)
const User = mongoose.model('User', userSchema);
export default User;
