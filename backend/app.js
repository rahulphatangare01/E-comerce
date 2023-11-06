const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/error');

app.use(express.json())

// Routes 
const product =require('./routes/productsRoute');

app.use("/api/v1", product);

//  middleware for Error
app.use(errorMiddleware);

module.exports = app;