const express=require('express')
const router=new express.Router()
const staff=require('../controllers/staff')
const {staffAuth}=require('../middlewares/auth')

router.post('/staff_register',staff.staff_register)

router.post('/staff_login',staff.staff_login)


router.get('/staff_logout',staffAuth,staff.staff_logout)


module.exports=router