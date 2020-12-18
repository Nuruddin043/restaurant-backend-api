const express=require('express')
const router=new express.Router()
const order=require('../controllers/order')

const {customerAuth}=require('../middlewares/auth')

router.post('/order',customerAuth,order.takeNewOrder)

router.get('/all_order',order.getAllOrderInfo)

router.get('/order/:order_id',order.getSingleOrderInfo)

router.delete('/delete_order/:order_id',order.deleteSingleOrder)

module.exports=router