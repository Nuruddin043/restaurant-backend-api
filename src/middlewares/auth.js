const jwt=require('jsonwebtoken')
const Sutff=require('../models/stuff')
const Customer=require('../models/customer')

const stuffAuth= async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const stuff= await Sutff.findOne({_id:decoded._id,'tokens.token':token})
        if(!stuff){
            throw new Error()
        }
        req.user=stuff
        req.token=token
        next()
        
    }catch(e){
        res.status(401).send({error:'please authenticate'})
    }
}

const customerAuth= async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const customer= await Customer.findOne({_id:decoded._id,'tokens.token':token})
        if(!customer){
            throw new Error()
        }
        req.user=customer
        req.token=token
        next()
        
    }catch(e){
        res.status(401).send({error:'please authenticate'})
    }
}


module.exports={
    stuffAuth,
    customerAuth
}