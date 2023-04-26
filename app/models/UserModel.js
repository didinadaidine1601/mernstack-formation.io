import mongoose from "mongoose";


//definition de la collection(schema)

const UserSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
            validate: (value) => {
                if (value === "") {
                    throw new Error("le champs nom ne peut pas etre null")
                }
            }
        },
        prenom: {
            type: String,
            required: true,
            trim: true,
            validate: (val) => {
                if (val === "") {
                    throw new Error("le prenom ne peut pas etre null")
                }
            }
        },
        matricule: {
            type: Number,
            required: true,
            trim: true,
            unique:true,
            validate: (value) => {
                if (value === null) {
                    throw new Error("le matricule ne peut pas etre null")
                }
            }
        },
        profession: {
            type: String,
            required: true,
            trim: true,
            validate: (value) => {
                if (value === null) {
                    throw new Error("la profession ne peut pas etre null")
                }
            }
        },
        datenaissance: {
            type: String,
            required: true,
            trim: true,
            validate: (value) => {
                if (value === "") {
                    throw new Error("la date de naissance ne peut pas etre null")
                }
            }
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            validate:(value)=>{
                if (value==="") {
                    throw new Error("l'addresse email ne peut pas etre null")
                }
            }

        },
        password:{
            type:String,
            required:true,
            trim:true,
            validate:(value)=>{
                if (value==="") {
                    throw new Error('le mot de passe ne peut pas etre null')
                }
            }

        }
    },
    {
        timestamps: true
    }
)

UserSchema.path('matricule').index({ unique: true });
UserSchema.path('email').index({unique:true})
//creation du model
const UserModel = mongoose.model("users",UserSchema)

export default UserModel