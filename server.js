import express from "express";
import dotenv from 'dotenv'
import routes from './routes/routes.js'
import mongoose from "mongoose";
import cors from "cors"

dotenv.config()

//port d'ecoute du server
const PORT=process.env.PORT || 6000
//declaration de l'application
const app=express()
app.use(express.json())
app.use(cors())

app.use(routes)  // server utilise nos route

/**
 * connexion de la base de donnée
 */
try {
    mongoose.connect(process.env.MONGOD);
    console.log("connexion reusi");

} catch (error) {
    throw Error(`erreur de connexion: ${error}`)
   
}


/**
 * lancement du server sur le port souhaité
 */
app.listen(PORT,()=>{
    console.log(`server run on port: ${PORT}`);
})




