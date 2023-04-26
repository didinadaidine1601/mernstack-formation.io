import mongoose from "mongoose";

//schema
const MatiereSchema=mongoose.Schema(
    {
        nom:{
            type:String,
            trim:true,
            required:true,
            uppercase:true,
            validate:(value)=>{
                if (value==="") {
                    throw new Error("le nom de la matiere ne peut pas etre null")
                }
            }

        },
        volume_horaire:{
            type:Number,
            trim:true,
            required:true,
            uppercase:true,
            validate:(value)=>{
                if (value===null) {
                    throw new Error("le volume horaire de la matiere ne peut pas etre null")
                }
            }

        },
        _idenseignant:[{type:mongoose.Types.ObjectId,ref:"users"}]
    },
    {
        timestimps:true
    })



//model
const MatiereModel=mongoose.model('matieres',MatiereSchema)

export default MatiereModel