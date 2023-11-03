const app = require ('./app');

const dotenv =require('dotenv');

// cxonfig
dotenv.config({path:'backend/config/config.env'});

app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})