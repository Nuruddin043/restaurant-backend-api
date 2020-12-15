const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const string_required={
    type:String,
    required:true,
    trim:true
}
const stuffSchema=new mongoose.Schema({
    stuff_name:{
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

stuffSchema.methods.generateAuthToken=async function(){
    const stuff=this
    const token=jwt.sign({_id:stuff._id.toString()},process.env.JWT_SECRET)
    stuff.tokens= stuff.tokens.concat({token})
    await stuff.save()
    return token
}


stuffSchema.pre('save',async function(next){
    const stuff=this
    if(stuff.isModified('password')){
        stuff.password=await bcrypt.hash(stuff.password,8)
    }
    next()
})

stuffSchema.statics.findByCredentials= async(user_name,password)=>{
    const stuff=await Stuff.findOne({user_name})
    if(!stuff){
        throw new Error('unable to login')
    }

    const isMatch=await bcrypt.compare(password,stuff.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return stuff
}

const Stuff=mongoose.model('Stuff',stuffSchema)

module.exports=Stuff