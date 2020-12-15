const express=require('express');
const router=new express.Router()
const dining=require('../controllers/dining_status')

router.post('/dining_status',dining.updateStatus)


router.get('/dining_status',dining.getStatus)

module.exports=router