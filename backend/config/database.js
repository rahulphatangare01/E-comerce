const mongoose = require('mongoose');
const connectDB = async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS ={
            dbName:"E-comm(MERN)"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log('Database connection established')
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = connectDB