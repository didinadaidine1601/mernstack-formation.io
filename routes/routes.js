import express from "express"
import { 
    addUser,getUsers,deleteUsers,updateusers
} from "../app/controllers/UserController.js"

import {
    addmatiere,getmatiere,deletematiere,updateMatiere
} from "../app/controllers/MatiereController.js"
import { catcherrors } from "../helpers.js"





// variable qui stock tous nos routes
const route=express.Router()


//route pour ajouter des donnés
route.post('/adduser',catcherrors(addUser))
route.get('/getAllusers',catcherrors(getUsers))
route.delete('/deleteusers/:user',catcherrors(deleteUsers))
route.patch("/updateuser/:user",catcherrors(updateusers))


//route pour matiere

route.post('/addmatiere',catcherrors(addmatiere))
route.get('/getAllMatiere',catcherrors(getmatiere))

route.delete('/deleteMatiere/:user',catcherrors(deletematiere))
route.patch("/updateMatiere/:user",catcherrors(updateMatiere))




export default route