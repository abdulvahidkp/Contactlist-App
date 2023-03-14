const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config'); 
const userRouter = require ('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

mongoose.connect(process.env.mongodb || "mongodb://localhost:27017/contactList");

app.use('/api', userRouter)

app.listen(3000, () => console.log('port connected'))