const express=require('express')
const router=new express.Router()
const reservation=require('../controllers/reservation')

router.post('/add_reservation',reservation.addNewReservation)
router.get('/all_reservation',reservation.getAllReservation)
router.get('/cancel_reservation/:reservation_id',reservation.cancelReservation)


module.exports=router