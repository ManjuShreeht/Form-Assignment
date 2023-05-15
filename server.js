const express=require('express')
const dotenv=require('dotenv').config();
const connectDB=require('./config/db.js')
const itemRoute =require('./routes/itemRoute.js')
const cors=require('cors')


connectDB()
const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/user',itemRoute)

const port=process.env.PORT || 6776


app.listen(port,()=>{
    console.log(`server connect on port number ${port}`)
})