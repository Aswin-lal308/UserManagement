const express = require("express");
const cors = require('cors')
const dotevn = require('dotenv')
dotevn.config();

const connectDB = require('./config/db')
connectDB();

const app = express()

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT
app.listen(PORT,()=> console.log(`the backend server is running on ${PORT}`))


