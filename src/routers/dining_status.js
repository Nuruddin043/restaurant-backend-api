const express=require('express');
const router=new express.Router()
const dining=require('../controllers/dining_status')
const {staffAuth}=require('../middlewares/auth')

router.post('/dining_status',staffAuth,dining.updateStatus)


router.get('/dining_status',dining.getStatus)

module.exports=router