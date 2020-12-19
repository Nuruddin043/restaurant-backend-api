const Bill = require('../models/bills')
const Order=require('../models/orders')

exports.takeNewOrder=async(req,res,next)=>{
    try{
        let total_price=req.body.total_price
        delete req.body.total_price

        const newOrder=new Order(req.body)
        newOrder.order_date=new Date()
        newOrder.customer_id=req.user._id
        await newOrder.save()
        
        let tax=0   ///calculate tax here
        let total=total_price+tax
        const newBill=new Bill({
            order_id:newOrder._id,
            total_price:total_price,
            tax:0,
            total_bill:total
        })
        await newBill.save()


        res.send({
            "success":true,
            "msg":"order has taken successfully",
            "data":newOrder
        })
    }catch(e){
        next(e)
    }
}



exports.getAllOrderInfo=async(req,res,next)=>{
    try{
        Order.find()
        .populate('customer_id')
        .populate('item_list')
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

exports.getSingleOrderInfo=async(req,res,next)=>{
    try{
        Order.findOne({_id:req.params.order_id})
        .populate('customer_id')
        .populate('item_list')
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

exports.deleteSingleOrder=async(req,res,next)=>{
    try{
        const order= await Order.findOneAndDelete({_id:req.params.order_id})
        if(order){
            res.send({
                "success":true,
                "msg":"order canceled successfully"
            })
        }else{
            res.send({
                "success":false,
                "msg":"order not found"
            })
        }
    }catch(e){
        next(e)
    }
}

exports.getBillInfo=async(req,res,next)=>{
    try{
        const bill= await Bill.findOne({order_id:req.params.order_id})
        if(bill){
            res.send({
                "success":true,
                data:bill
            })
        }else{
            res.send({
                "success":false,
                "msg":"order not found"
            })
        }
    }catch(e){
        next(e)
    }
}
