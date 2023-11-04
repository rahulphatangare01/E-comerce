const app = require ('./app');

const dotenv =require('dotenv');
const connectDB = require('./config/database');

// config
dotenv.config({path:'backend/config/config.env'});
const DATABASE_URL = process.env.DATABASE_URL

// Database connection
connectDB(DATABASE_URL)



app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT  }`)
})