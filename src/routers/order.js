const express=require('express')
const router=new express.Router()
const order=require('../controllers/order')

const {customerAuth,staffAuth}=require('../middlewares/auth')

router.post('/order',customerAuth,order.takeNewOrder)

router.get('/all_order',staffAuth,order.getAllOrderInfo)

router.get('/order/:order_id',staffAuth,order.getSingleOrderInfo)

router.get('/delete_order/:order_id',customerAuth,order.deleteSingleOrder)

router.get('/bill_info/:order_id',customerAuth,order.getBillInfo)

module.exports=router