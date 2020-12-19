const express=require('express');
const router=new express.Router()
const items=require('../controllers/items')
const {staffAuth}=require('../middlewares/auth')
const multer = require('multer')


///multipart data handler 
const upload = multer({

  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('FILE must be image'))
    }
    cb(undefined, true)
  }
})




router.post('/add_item',staffAuth,upload.single('item_photo'),items.addItem)

router.patch('/update_item/:item_id',staffAuth,items.updateItem)

router.get('/item/all',items.getAllItem)

router.get('/item/:item_id',items.getSingleItem)

router.get('/item/category/:item_category',items.getSameCategoriesItem)

router.get('/delete_item/:item_id',staffAuth,items.deteleItem)

router.get('/item_photo/:id', items.getItemImage)



module.exports=router