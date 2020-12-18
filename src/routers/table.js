const express=require('express')
const router=new express.Router()
const table=require('../controllers/table')

router.post('/add_table',table.addNewTable)

router.get('/table_info',table.getTableList)

module.exports=router