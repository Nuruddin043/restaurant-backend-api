const Customer=require('../models/customer')

///register new customer
exports.regNewCustomer=async(req,res,next)=>{
    try{
        const user=await Customer.findOne({mobile:req.body.mobile})
        if(user){
            return res.send({
                "success1": false,
                "msg": 'Already registered with this number'
            })
        }
        const newCustomer=new Customer(req.body)
        await newCustomer.save()
        
        res.status(201).send({
            "success1": true,
            "data": newCustomer
        })
    }catch(e){
        next(e)
    }
}

//customer login
exports.customerLogin=async(req,res,next)=>{
    try{
        const user=await Customer.findByCredentials(req.body.mobile,req.body.password)
        const token=await user.generateAuthToken()
        res.send({
            "success1": true,
             token
        })
    }catch(e){
        next(e)
    }
}


//customer logout
exports.customerLogOut=async(req,res,next)=>{
    try{
        console.log(req.user)
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!=req.token
        })
        await req.user.save()
        res.send({
            "success1": true,
            "msg":"logout successfully"
        })
    }catch(e){
        next(e)
    }
}

