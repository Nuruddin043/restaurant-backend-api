const express=require('express')
const bodyParser = require("body-parser");
var cors = require('cors')
require('dotenv').config()
const app=express()

const PORT=process.env.PORT || 5000
require('./db/db_connection')

app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



const itemsRouter=require('./src/routers/items')
const diningRouter=require('./src/routers/dining_status')
const menuRouter=require('./src/routers/menu')
const customerRouter=require('./src/routers/customer')
const staffRouter=require('./src/routers/staff')
const tableRouter=require('./src/routers/table')
const reservationRouter=require('./src/routers/reservation')
const orderRouter=require('./src/routers/order')
app.use(itemsRouter)
app.use(diningRouter)
app.use(menuRouter)
app.use(customerRouter)
app.use(tableRouter)
app.use(reservationRouter)
app.use(orderRouter)
app.use(staffRouter)
/////error handling route
app.use((req, res, next) => {
    const error = new Error(`Not found -${req.originalUrl}`)
    res.status(404)
    next(error)
})
app.use((error, req, res, next) => {
    res.send({
        "success":false,
        "msg": error.message
    })
})

app.listen(PORT,async()=>{
    console.log(`server is running on port ${PORT}`)
})