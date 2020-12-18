const express=require('express')
const router=new express.Router()
const customer=require('../controllers/customer')
const {customerAuth}=require('../middlewares/auth')

router.post('/cust_register',customer.regNewCustomer)

router.post('/cust_login',customer.customerLogin)


router.get('/cust_logout',customerAuth,customer.customerLogOut)


module.exports=router