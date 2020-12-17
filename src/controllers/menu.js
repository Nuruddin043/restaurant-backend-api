const e = require('express')
const Menu=require('../models/menu')

//add new menu
exports.addMenu=async(req,res,next)=>{
    try{
        const newMenu=new Menu(req.body)
        await newMenu.save()
        res.send({
            "success":true,
            "msg":"new menu added successfully"
        })
    }catch(e){
        next(e)
    }
}


//add new item into menu
exports.addItemToMenu=async(req,res,next)=>{
    try{
        const newItem=req.body.item_id
        const menu=await Menu.findById({_id:req.params.menu_id})
        if(menu){
            let isAdded=menu.item_list.includes(newItem)
            if(isAdded){
                return res.send({ //if already added this item
                    "success":false,
                    "msg":"This item already added to this menu"
                })
            }
            menu.item_list.push(newItem)
            await menu.save()
            return res.send({
                "success":true,
                "msg":"new item added into menu successfully",
                "data":menu
            })
        }else{
            res.send({
                "success":false,
                "msg":"menu not found"
            })
        }
        
        
    }catch(e){
        next(e)
    }
}

//delete item from a menu
exports.deleteItemFromMenu=async(req,res,next)=>{
    try{
        const item=req.body.item_id
        const menu=await Menu.findById({_id:req.params.menu_id})
        if(menu){
            let isFound=menu.item_list.includes(item)
            if(isFound){
                let index=menu.item_list.indexOf(item)
                menu.item_list.splice(index, 1);

                await menu.save()
                return res.send({
                    "success":true,
                    "msg":"item deleted successfully",
                    "data":menu
                })
            }else{
                return res.send({ //if already added this item
                    "success":false,
                    "msg":"Item not found in menu"
                })
            }
        }else{
            res.send({
                "success":false,
                "msg":"Menu not found"
            })
        }
        
    }catch(e){
        next(e)
    }
}

///delete a menu
exports.deleteMenu=async(req,res,next)=>{
    try{
        const menu=await Menu.findOneAndDelete({_id:req.params.menu_id})
        if(menu){
            res.send({
                "success":true,
                "msg":"Menu deleted successfully"
            })
        }else{
            res.send({
                "success":false,
                "msg":"Menu not found"
            })
        }
    }catch(e){
        next(e)
    }
}

///get all menu list
exports.getAllMenu=async(req,res,next)=>{
    try{


        Menu.
        find().
        populate('item_list').
        exec(function (err, menu) {
            if (err) return next(err);
            res.send({
                "success":true,
                "data":menu
            })
        });

    }catch(e){
        next(e)
    }
}

//get a single menu info
exports.getSingleMenu=async(req,res,next)=>{
    try{
        Menu.
        findById({_id:req.params.menu_id}).
        populate('item_list').
        exec(function (err, menu) {
            if (err) return next(err);
            res.send({
                "success":true,
                "data":menu
            })
        });
    }catch(e){
        next(e)
    }
}