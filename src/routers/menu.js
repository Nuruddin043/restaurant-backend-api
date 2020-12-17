const express=require('express');
const router=new express.Router()
const menu=require('../controllers/menu')

router.post('/add_menu',menu.addMenu)

router.post('/menu/add_item/:menu_id',menu.addItemToMenu)

router.post('/menu/delete_item/:menu_id',menu.deleteItemFromMenu)

router.delete('/delete_menu/:menu_id',menu.deleteMenu)

router.get('/menu_list',menu.getAllMenu)

router.get('/menu_list/:menu_id',menu.getSingleMenu)

module.exports=router