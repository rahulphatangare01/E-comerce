const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/error');

app.use(express.json())

// Routes 
const product =require('./routes/productsRoute');
const user = require('./routes/userRoute')

app.use("/api/v1", product);
app.use("/api/v1",user);


//  middleware for Error
app.use(errorMiddleware);

module.exports = app;