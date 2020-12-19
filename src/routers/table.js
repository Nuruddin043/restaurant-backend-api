const express=require('express')
const router=new express.Router()
const table=require('../controllers/table')
const{customerAuth,staffAuth}=require('../middlewares/auth')
router.post('/add_table',staffAuth,table.addNewTable)

router.get('/table_info',table.getTableList)

module.exports=router