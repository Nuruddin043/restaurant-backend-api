const Item=require('../models/items')
const { stuffAuth}=require('../middlewares/auth')
const sharp = require('sharp')

///add new food item
exports.addItem=async(req,res,next)=>{
    try{
        const buffer = await sharp(req.file.buffer).resize({ width: 400, height: 400 }).png().toBuffer()  ///converting image data into buffer for saving on mongodb
        req.body.item_photo_data = buffer
        const newItem=new Item(req.body)

        await newItem.save()

        delete newItem.item_photo_data

        res.status(201).send({
            "success":true,
            "msg":"Item added successfully"
        })
    }catch(e){
        next(e)
    }
}

///update a food item
exports.updateItem=async(req,res,next)=>{
    try{
      const updates = Object.keys(req.body)
      const allowedUpdates = ['item_name', 'item_price','item_category','item_details']
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
      if (!isValidOperation) {
          return res.status(400).send({"status":"failed", error: `Invalid updates! you can update these value ['item_name', 'item_price','item_category','item_details']` })
      }
  
      const item = await Item.findOne({ _id: req.params.item_id})
      if (!item) {
          return res.status(404).send({"status":"failed", error: 'item data not found!' })
      }
  
      updates.forEach((update) => item[update] = req.body[update])
      await item.save()
  
      res.status(201).send({
        "success":true,
        "data":item
    })
    }catch(e){
      next(e)
    }
  }

///get all list of item
  exports.getAllItem=async(req,res,next)=>{
    try{
        const all_items=await Item.find()
        
        res.status(200).send({
            "success":true,
            "data":all_items
        })
    }catch(e){
        next(e)
    }
}

//get a single item

exports.getSingleItem=async(req,res,next)=>{
    try{
        const item=await Item.find({_id:req.params.item_id})
        if(item){
            return res.send({
                "success":true,
                "data":item
            })
        }
        res.send({"success":false})
    }catch(e){
        next(e)
    }
}

//get all same categories item

exports.getSameCategoriesItem=async(req,res,next)=>{
    try{
        const item_list=await Item.find({item_category:req.params.item_category})
        if(item_list){
            return res.send({
                "success":true,
                "data":item_list
            })
        }
        res.send({"success":false})

    }catch(e){
        next(e)
    }
}


//delete a food item

exports.deteleItem=async(req,res,next)=>{
    try{

        const item= await Item.findOneAndDelete({_id:req.params.item_id})
        if(!item){
            return res.send({
                "success":false
            })
        }
        return res.send({
            "success":true,
            "data":item
        })

    }catch(e){
        next(e)
    }
}

//image data sent as a png format.
exports.getItemImage=async (req, res) => {
    try {
      const item = await Item.findById(req.params.id)
      if (!item || !item.item_photo_data) {
        throw new Error()
      }
  
      res.set('Content-Type', 'image/png')
      res.send(item.item_photo_data)
  
  
    } catch {
      res.status(404).send()
    }
  }