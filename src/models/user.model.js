import mongoose ,{Schema} from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from bcrypt;

const userSchema = new Schema({
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password:{
        type:String,
        required: [true,'Password is required']
    },
    username : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true
    },
    fullname : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    avatar : {
        type : String, // cloudnary URL
        required : true,
    },
    coverImage:{
        type:String
    },
    refreshToken : {
        type:String,
    }
},{timestamps:true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.crypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){}

export const User = mongoose.model("User",userSchema)