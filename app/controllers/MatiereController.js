import MatiereModel from "../models/MatiereModel.js"

//module pour ajout des matieres
export const addmatiere= async(req,res)=>{
    const stmt=MatiereModel(req.body)
    await stmt.save()
    if (stmt) {
        res.send('matiere ajouter')
    }else{
        res.send('une erreur est survenue')
    }
}


//getAll matiere

export const getmatiere= async(_,res)=>{
    const stmt= await MatiereModel.find()
    .populate('_idenseignant')
    
    if (stmt) {
        res.send(stmt)
    }else{
        res.send('une erreur est survenue')
    }
}

//delete matiere

export const deletematiere =async(_,res)=>{

}

//update matiere
export const updateMatiere =async(_,res)=>{
    
}