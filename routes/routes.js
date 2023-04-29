import express from "express"
import { 
    addUser,getUsers,deleteUsers,updateusers,searchuser,edituser
} from "../app/controllers/UserController.js"

import {
    addmatiere,getmatiere,deletematiere,updateMatiere,searchmatiere,editmatiere
} from "../app/controllers/MatiereController.js"
import { 
    addmention,getallmatiere,deleteMention,updateMention,searchmention,editMention
 } from "../app/controllers/MentionController.js"


import { 
    addoption ,getAlloption,deleteOption,updateOption,editoption
} from "../app/controllers/OptionController.js"

import { catcherrors } from "../helpers.js"




// variable qui stock tous nos routes
const route=express.Router()


//route pour ajouter des donnés
route.post('/api/adduser',catcherrors(addUser))
route.get('/api/getAllusers',catcherrors(getUsers))
route.delete('/api/deleteusers/:user',catcherrors(deleteUsers))
route.patch("/api/updateuser/:user",catcherrors(updateusers))
route.post('/api/searchuser',catcherrors(searchuser))
route.get('/api/edituser/:user',catcherrors(edituser))


//route pour matiere

route.post('/api/addmatiere',catcherrors(addmatiere))
route.get('/api/getAllMatiere',catcherrors(getmatiere))
route.delete('/api/deleteMatiere/:id',catcherrors(deletematiere))
route.patch("/api/updateMatiere/:id",catcherrors(updateMatiere))
route.post('/api/searchmatiere',catcherrors(searchmatiere))
route.get('/api/editmatiere/:id',catcherrors(editmatiere))

//route pour mention

route.post('/api/addMention',catcherrors(addmention))
route.get('/api/getAllMention',catcherrors(getallmatiere))
route.delete('/api/deleteMention/:id',catcherrors(deleteMention))
route.patch('/api/updatemention/:id',catcherrors(updateMention))
route.post('/api/searchMention',catcherrors(searchmention))
route.get('/api/editMention/:id',catcherrors(editMention))


//route pour les options
route.post('/api/addoption',catcherrors(addoption))
route.get('/api/getAlloption',catcherrors(getAlloption))
route.delete('/api/deleteoption/:id',catcherrors(deleteOption))
route.patch('/api/updateoption/:id',catcherrors(updateOption))
route.get('/api/editoption/:id',catcherrors(editoption))


export default route