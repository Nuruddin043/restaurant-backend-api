const express=require('express')
const router=new express.Router()
const order=require('../controllers/order')

const {customerAuth}=require('../middlewares/auth')

router.post('/order',customerAuth,order.takeNewOrder)

router.get('/all_order',order.getAllOrderInfo)

router.get('/order/:order_id',order.getSingleOrderInfo)

router.get('/delete_order/:order_id',order.deleteSingleOrder)

router.get('/bill_info/:order_id',order.getBillInfo)

module.exports=router