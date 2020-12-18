const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const string_required={
    type:String,
    required:true,
    trim:true
}
const customerSchema=new mongoose.Schema({
    cust_name:{
        ...string_required
    },
    mobile:{
        ...string_required
    },
    dob:{
        type:Date
    },
    address:{
        ...string_required
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})
customerSchema.methods.toJSON = function(){
    const customer=this
    const customerObject= customer.toObject()
    delete customerObject.password
    delete customerObject.tokens
    return customerObject
}

customerSchema.methods.generateAuthToken=async function(){
    const customer=this
    const token=jwt.sign({_id:customer._id.toString()},process.env.ACCESS_TOKEN_SECRET)
    customer.tokens= customer.tokens.concat({token})
    await customer.save()
    return token
}

customerSchema.pre('save',async function(next){
    const customer=this
    if(customer.isModified('password')){
        customer.password=await bcrypt.hash(customer.password,8)
    }
    next()
})

customerSchema.statics.findByCredentials= async(mobile,password)=>{
    const customer=await Customer.findOne({mobile})
    if(!customer){
        throw new Error('unable to login')
    }

    const isMatch=await bcrypt.compare(password,customer.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return customer
}

const Customer=mongoose.model('Customer',customerSchema)

module.exports=Customer