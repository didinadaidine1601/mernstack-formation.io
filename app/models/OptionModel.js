import mongoose from "mongoose";


//schema
const OptionSchema=mongoose.Schema(
    {
        nom:{
            type:String,
            required:true,
            trim:true,
            uppercase:true,
            validate:(value)=>{
                if (value==="") {
                    throw new Error("le nom ne peut pas etre null")
                }
            }

        },
        niveau:{
            type:String,
            required:true,
            trim:true,
            uppercase:true,
            validate:(value)=>{
                if (value==="") {
                    throw new Error("le niveau ne peut pas etre null")
                }
            }

        },
        _idmentions:[{type:mongoose.Types.ObjectId, ref:"mentions"}]
    },
    {
        timestimps:true
    })



// model
const OptionModel=mongoose.model('options',OptionSchema)

export default OptionModel