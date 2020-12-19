const Staff=require('../models/staff')

///register new staff
exports.staff_register=async(req,res,next)=>{
    try{
        const user=await Staff.findOne({user_name:req.body.user_name})
        if(user){
            return res.send({
                "success1": false,
                "msg": 'Already registered with this user_name'
            })
        }
        const newStaff=new Staff(req.body)
        await newStaff.save()
        
        res.status(201).send({
            "success1": true,
            "data": newStaff
        })
    }catch(e){
        next(e)
    }
}

//customer staff
exports.staff_login=async(req,res,next)=>{
    try{
        const user=await Staff.findByCredentials(req.body.user_name,req.body.password)
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
exports.staff_logout=async(req,res,next)=>{
    try{
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

