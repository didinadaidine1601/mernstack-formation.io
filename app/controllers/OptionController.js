import OptionModel from "../models/OptionModel.js"


//module pour ajout d'option
export const addoption = async (req, res) => {
    try {
        const stmt = OptionModel(req.body)
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
        res.send({
            "message": false
        })
    }

}

//show all oprions

export const getAlloption = async (req, res) => {
    try {
        const stmt = await OptionModel.find().populate('_idmentions')

        if (stmt) {
            res.send(stmt)
        } else {
            res.send({
                "message": false
            })
        }

    } catch (error) {
        res.send({
            "message": false
        })
    }
}

//delete options
export const deleteOption = async (req, res) => {
    const id = req.params.id
    try {
        const stmt = await OptionModel.findByIdAndDelete(id)
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
        res.send({
            "message": false
        })
    }
}

// update option
export const updateOption = async (req, res) => {
    const id = req.params.id
    try {
        const stmt = await OptionModel.findByIdAndUpdate(id, req.body)
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
        res.send({
            "message": false
        })
    }
}

//editer une options

export const editoption=async (req, res) => {
    const id=req.params.id
    try {
        const stmt=await OptionModel.findById(id).populate('_idmentions')
        if (stmt) {
            res.send(stmt)
        }else{
            res.send({
                "message":false
            })
        }
    } catch (error) {
        res.send({
            "message":false
        })
    }
}