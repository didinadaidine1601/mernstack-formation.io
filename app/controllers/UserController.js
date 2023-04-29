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
            res.status(200).send({
                "message": true
            })

        } else {
            res.status(201).send({
                "message": false
            })
        }

    } catch (error) {
        res.status(500).send({
            "message": false,
            "error":error
        })
    }



}


/**
 * filtrage de tous les utilisateurs
 * @param {*} req 
 * @param {*} res 
 */

export const getUsers = async (req, res) => {
    const stmt = await UserModel.find()
    if (stmt) {
        res.send(stmt)
    } else {
        res.send({
            "message": false
        })
    }

}

/**
 * suppression d'un utilisateur
 * @param {*} req 
 * @param {*} res 
 */
export const deleteUsers = async (req, res) => {
    const idusers = req.params.user
    const stmt = await UserModel.findByIdAndDelete(idusers)

    if (stmt) {
        res.send({
            "message": true
        })

    } else {
        res.send({
            "message": false
        })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const updateusers = async (req, res) => {
    const idusers = req.params.user
    const stmt = await UserModel.findByIdAndUpdate(idusers, req.body)


    if (stmt) {
        res.send({
            "message": true
        })

    } else {
        res.send({
            "message": false
        })
    }
}

/**
 * filtre pour les utilisateur
 * @param {*} req 
 * @param {*} res 
 */

export const searchuser = async (req, res) => {
    //const stmt=await UserModel.find(req.body)
    const motcle = req.body['search']

    const  mconver=Number.parseFloat(motcle).valueOf()
    const isnull=Number.isNaN(mconver)


    const stmt = await UserModel.find({
        $or: [
            {
                "nom": motcle
            },
            {
                "prenom": motcle
            },
            {
                "matricule": isnull ? 0: mconver
            },
            {
                "profession": motcle    
            },
            {
                "email": motcle
            }
        ]
    })
    if (stmt) {
        res.send(stmt)
    } else {
        res.send({
            "message": false
        })
    }
}

/**
 * editer un utilisateur
 * @param {*} req 
 * @param {*} res 
 */
export const edituser=async (req, res) => {

    const id=req.params.user
    const stmt=await UserModel.findById(id)
    if (stmt) {
        res.send(stmt)
    } else {
        res.send({
            "message": false
        })
    }

}