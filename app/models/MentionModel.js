import mongoose from "mongoose";

//schema
const MentionSchema=mongoose.Schema(
    {
        nom:{
            type:String,
            unique:true,
            required:true,
            uppercase:true,
            trim:true,
            validate:(value)=>{
                if (value ==="") {
                    throw new Error("le nom de la mention ne peut pas etre null")
                }
            }
        }
    },
    {
        timestamps:true
    }
)

MentionSchema.path('nom').index({unique:true})

const MentionModel=mongoose.model('mentions',MentionSchema)

export default MentionModel