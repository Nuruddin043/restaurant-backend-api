const Dining = require('../models/dining_status')

exports.updateStatus = async (req, res, next) => {
    try {

        const current_status = await Dining.find({})
        if (current_status.length>0) {
            current_status[0].status=req.body.status
            await current_status[0].save()
            return res.send({
                "success1": true,
                "data": current_status[0]
            })
        } else {
            const newStatus=new Dining(req.body)
            await newStatus.save()
            res.send({
                "success2": true,
                "data": newStatus
            })
        }
    } catch (e) {
        next(e)
    }
}

exports.getStatus = async (req, res, next) => {
    try {
        const current_status = await Dining.find({})
        return res.send({
            "success1": true,
            "data": current_status[0]
        })

    } catch (e) {
        next(e)
    }
}

