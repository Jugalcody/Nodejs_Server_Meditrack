const express=require('express');
const colors=require('colors');
const morgan=require('morgan');
const connectDB=require('./config/db');

const app=express();
/*app.use((req,res,next)=>{    //middle ware is running
    console.log("Middleware ran");
    req.title="Rikesh";
    next();
})  */

const dotenv=require('dotenv');
dotenv.config({
    path:'./config/config.env'
});
app.use(morgan('dev'));

app.use(express.json({}));
app.use(express.json({
    extended:true
}))

connectDB();
app.use('/api/patient',require('./routes/patient'));
app.use('/api/doctor',require('./routes/doctor'));
app.use('/api/doctor',require('./routes/authDoctor'));
app.use('/api/patient',require('./routes/authPatient'));
app.use('/api/patient',require('./routes/searchPatient'));
app.use('/api/patient',require('./routes/patientPassword'));
app.use('/api/doctor',require('./routes/doctorPassword'));
app.use('/api/patient',require('./routes/updatePatient'));
app.use('/api/doctor',require('./routes/updateDoctor'));
const PORT=process.env.PORT || 3000;


app.listen(3000,console.log(`Server is running on port : ${PORT}`.red.underline.bold));