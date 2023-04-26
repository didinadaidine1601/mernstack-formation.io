import mongoose from "mongoose";

const ProfilSchema=mongoose.Schema(
    {
        image:{
            type:String,
            trim:true,
            required:true,
            validate:(value)=>{
                if (value==="") {
                    throw new Error("l'image ne peut pas etre null")
                }
            }
        },
        taille:{
            type:Number,
            trim:true,
            required:true,
            validate:(value)=>{
                if (value===0) {
                    throw new Error("la taille ne peut pas etre null")
                }
            }

        },
        extension:{
            type:String,
            trim:true,
            required:true,
            validate:(value)=>{
                if (value==="") {
                    throw new Error("l'extension ne peut pas etre null")
                }
            }

        },
        _idusers:[{type:mongoose.Types.ObjectId,ref:"users" }],
        _status:{
            type:Number,
            trim:true,
        }
    },
    {
        timestimps:true
    })








const ProfileModel=mongoose.model('profiles',ProfilSchema)

export default ProfileModel