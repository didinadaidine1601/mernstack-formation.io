import MentionModel from "../models/MentionModel.js"


//module pour ajouter une mention
export const addmention = async (req, res) => {
    try {
        const stmt = MentionModel(req.body)
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
    } catch (error) {
        res.status(500).send({
            "message": false
        })
    }
}

// show all matiere
export const getallmatiere = async (req, res) => {
    const stmt = await MentionModel.find()
    if (stmt) {
        res.send(stmt)
    } else {
        res.send({
            "message": false
        })
    }
}

// delete mention

export const deleteMention = async (req, res) => {
    const id = req.params.id
    try {
        const stmt = await MentionModel.findByIdAndDelete(id)
        if (stmt) {
            res.send({
                "message": true
            })
        } else {
            res.send({
                "message": false
            })
        }
    } catch (error) {
        res.status(500).send({
            "message": false
        })
    }
}

//modifier une mention

export const updateMention = async (req, res) => {
    const id = req.params.id
    try {
        const stmt = await MentionModel.findByIdAndUpdate(id, req.body)
        if (stmt) {
            res.send({
                "message": true
            })
        } else {
            res.send({
                "message": false
            })
        }
    } catch (error) {
        res.status(500).send({
            "message": false
        })
    }
}

//recherche d'un mention

export const searchmention= async (req, res) => {

}


//module pour editer une mention

export const editMention= async (req, res) => {

    const id=req.params.id
    try {
        const stmt=await MentionModel.findById(id)
        if (stmt) {
            res.send(stmt)
        } else {
            res.send({
                "message": false
            })
        }
        
    } catch (error) {
        res.send({
            "message":false
        })
    }

}