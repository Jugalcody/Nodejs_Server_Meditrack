const express=require('express');
const colors=require('colors');
const morgan=require('morgan');
const connectDB=require('./config/db');

const app=express();


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
app.use('/api/patient',require('./routes/patientDetails'));
app.use('/api/doctor',require('./routes/doctorDetails'));
app.use('/api/patient',require('./routes/updatePatient'));
app.use('/api/doctor',require('./routes/updateDoctor'));
app.use('/api/doctor',require('./routes/addedDoctorside'));
app.use('/api/patient',require('./routes/addedPatientside'));
app.use('/api/doctor',require('./routes/updateDoctorside'));
app.use('/api/patient',require('./routes/updatePatientside'));
app.use('/api/patient',require('./routes/deletePatient'));
app.use('/api/doctor',require('./routes/deleteDoctor'));
app.use('/api/doctor',require('./routes/searchDoctors'));
app.use('/api/doctor',require('./routes/searchHospitals'));
app.use('/api/doctor',require('./routes/updateReviews'));
app.use('/api/doctor',require('./routes/updateTotalStar'));
app.use('/api/shristi',require('./routes/addParticipant'));
app.use('/api/shristi',require('./routes/updateParticipant'));
app.use('/api/shristi',require('./routes/deleteParticipant')); 
const PORT=process.env.PORT || 3000;


app.listen(3000,console.log(`Server is running on port : ${PORT}`.red.underline.bold));
