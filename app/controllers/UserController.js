import UserModel from "../models/UserModel.js"

/**
 * module pour ajouter des donnee
 * @param {*} req 
 * @param {*} res 
 */
export const addUser = async (req, res) => {

    try {
        const stmt = new UserModel(req.body)
        await stmt.save()

        if (stmt) {
            res.send('utilisateur ajouter')

        } else {
            res.send('une erreur est survenue')
        }

    } catch (error) {
        res.send(`une erreur est survenue lors de l'insertion : ${error}`)
    }



}


/**
 * filtrage de tous les utilisateurs
 * @param {*} req 
 * @param {*} res 
 */

export const getUsers=async (req,res)=> {
    const stmt= await UserModel.find()
    if (stmt) {
        res.send(stmt)
    }else{
        res.send([])
    }

}

/**
 * suppression d'un utilisateur
 * @param {*} req 
 * @param {*} res 
 */
export const deleteUsers=async (req,res)=>{
    const idusers=req.params.user
    const stmt= await UserModel.findByIdAndDelete(idusers)
    if (stmt) {
        res.send("user delete")
    }else{
        res.send("une erreur est survenue")
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const updateusers=async (req,res)=>{
    const idusers=req.params.user
    const stmt=await UserModel.findByIdAndUpdate(idusers,req.body)

    if (stmt) {
        res.send("user updated")
    }else{
        res.send("une erreur est survenue")
    }
}