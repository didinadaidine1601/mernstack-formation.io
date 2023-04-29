import MatiereModel from "../models/MatiereModel.js"

//module pour ajout des matieres
export const addmatiere = async (req, res) => {
    const stmt = MatiereModel(req.body)
    await stmt.save()
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


//getAll matiere

export const getmatiere = async (_, res) => {
    const stmt = await MatiereModel.find()
        .populate('_idenseignant')

    if (stmt) {
        res.send(stmt)
    } else {
        res.send({
            "message": false
        })
    }
}

//delete matiere

export const deletematiere = async (req, res) => {
    const id = req.params.id
    const stmt = await MatiereModel.findByIdAndDelete(id)

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

//update matiere
export const updateMatiere = async (req, res) => {
    const id = req.params.id
    const stmt = await MatiereModel.findByIdAndUpdate(id, req.body)
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
 * filtre pour les matiere
 * @param {*} req 
 * @param {*} res 
 */

export const searchmatiere = async (req, res) => {

    const stmt = await MatiereModel.find(req.body)
        .populate('_idenseignant')
    if (stmt) {
        res.send(stmt)
    } else {
        res.send({
            "message": false
        })
    }
}


/**
 * editer un matiere
 * @param {*} req 
 * @param {*} res 
 */
export const editmatiere = async (req, res) => {
    const id = req.params.id
    const stmt = await MatiereModel.findOne({ "_id": id })
    .populate('_idenseignant')
    if (stmt) {
        res.send(stmt)
    } else {
        res.send({
            "message": false
        })
    }

}