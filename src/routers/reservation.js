const express=require('express')
const router=new express.Router()
const reservation=require('../controllers/reservation')
const{customerAuth,staffAuth}=require('../middlewares/auth')
router.post('/add_reservation',customerAuth,reservation.addNewReservation)
router.get('/all_reservation',staffAuth,reservation.getAllReservation)
router.get('/reservation/:reservation_id',reservation.getSingleReservation)
router.get('/check_table_status/:table_no',reservation.checkTableStatus)
router.get('/cancel_reservation/:reservation_id',staffAuth,reservation.cancelReservation)


module.exports=router