const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const string_required={
    type:String,
    required:true,
    trim:true
}
const staffSchema=new mongoose.Schema({
    staff_name:{
        ...string_required
    },
    user_name:{
        ...string_required
    },
    password:{
        type:String,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})
staffSchema.methods.toJSON = function(){
    const staff=this
    const staffObject= staff.toObject()
    delete staffObject.password
    delete staffObject.tokens
    return staffObject
}

staffSchema.methods.generateAuthToken=async function(){
    const staff=this
    const token=jwt.sign({_id:staff._id.toString()},process.env.ACCESS_TOKEN_SECRET)
    staff.tokens= staff.tokens.concat({token})
    await staff.save()
    return token
}


staffSchema.pre('save',async function(next){
    const staff=this
    if(staff.isModified('password')){
        staff.password=await bcrypt.hash(staff.password,8)
    }
    next()
})

staffSchema.statics.findByCredentials= async(user_name,password)=>{
    const staff=await Staff.findOne({user_name})
    if(!staff){
        throw new Error('unable to login')
    }

    const isMatch=await bcrypt.compare(password,staff.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return staff
}

const Staff=mongoose.model('Staff',staffSchema)

module.exports=Staff