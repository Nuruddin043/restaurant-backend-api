const { findOneAndDelete } = require('../models/reservation')
const Reservation=require('../models/reservation')

exports.addNewReservation=async(req,res,next)=>{
    try{
        
        
        const isReserved=await Reservation.findOne({res_date:req.body.res_date,table_no:req.body.table_no})
        if(isReserved){
            return res.send({
                "success":false,
                "msg":"This table already reserved for this time"
            })
        }
        const addNewReservation=new Reservation(req.body)  
        addNewReservation.customer_id=req.user._id
        await addNewReservation.save()
        res.send({
            "success":true,
            "msg":"Reservation has taken successfully",
            "data":addNewReservation
        })
    }catch(e){
        next(e)
    }
}

exports.getAllReservation=async(req,res,next)=>{
    try{
        Reservation.find()
        .populate('customer_id')
        .exec(function (err, results) {
            res.send({
                "success":true,
                "data":results
            })
        });
    }catch(e){
        next(e)
    }
}

exports.getSingleReservation=async(req,res,next)=>{
    try{
        Reservation.findOne({_id:req.params.reservation_id})
        .populate('customer_id')
        .exec(function (err, results) {
            res.send({
                "success":true,
                "data":results
            })
        });
    }catch(e){
        next(e)
    }
}

exports.checkTableStatus=async(req,res,next)=>{
    try{
   
        const reservationForThisTable=await Reservation.find({table_no:req.params.table_no,res_date:{$gte: new Date()}})
        res.send({
            "success":true,
            "data":reservationForThisTable
        })
    }catch(e){
        next(e)
    }
}

exports.cancelReservation=async(req,res,next)=>{
    try{
        const reservation=await Reservation.findOneAndDelete({_id:req.params.reservation_id})
        if(reservation){
            res.send({
                "success":true,
                data:reservation
            })
        }else{
            res.send({
                "success":false,
                "msg":"reservation not found"
            })
        }
    }catch(e){
        next(e)
    }
}