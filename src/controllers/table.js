const Table=require('../models/table')

exports.addNewTable=async(req,res,next)=>{
    try{
        const isAdded=await Table.findOne({table_no:req.body.table_no})
        if(isAdded){
            return res.send({
                "success":false,
                "msg":"this table no already added"
            })
        }
        const newTable=new Table(req.body)
        await newTable.save()
        res.send({
            "success":true,
            "msg":"new table added successfully"
        })
    }catch(e){
        next(e)
    }
}


exports.getTableList=async(req,res,next)=>{
    try{
        const all_table=await Table.find()
        res.send({
            "success":true,
            "data":all_table
        })
    }catch(e){
        next(e)
    }
}