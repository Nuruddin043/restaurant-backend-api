const jwt=require('jsonwebtoken')
const Sutff=require('../models/staff')
const Customer=require('../models/customer')

const staffAuth= async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const staff= await Sutff.findOne({_id:decoded._id,'tokens.token':token})
        if(!staff){
            throw new Error()
        }
        req.user=staff
        req.token=token
        next()
        
    }catch(e){
        res.status(401).send({"success1": false,
        msg:'please authenticate'})
    }
}

const customerAuth= async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const customer= await Customer.findOne({_id:decoded._id,'tokens.token':token})
        if(!customer){
            throw new Error()
        }
        req.user=customer
        req.token=token
        next()
        
    }catch(e){
        console.log(e)
        res.status(401).send({
            "success1": false,
            msg:'please authenticate'
        })
    }
}


module.exports={
    staffAuth,
    customerAuth
}