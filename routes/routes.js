import express from "express"
import { 
    addUser,getUsers,deleteUsers,updateusers
} from "../app/controllers/UserController.js"
import { catcherrors } from "../helpers.js"



// variable qui stock tous nos routes
const route=express.Router()


//route pour ajouter des donnés
route.post('/adduser',catcherrors(addUser))
route.get('/getAllusers',catcherrors(getUsers))
route.delete('/deleteusers/:user',catcherrors(deleteUsers))
route.patch("/updateuser/:user",catcherrors(updateusers))





export default route