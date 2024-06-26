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
app.use('/api/doctor',require('./routes/delpatfromdoc'));
app.use('/api/doctor',require('./routes/addedDoctorside'));
app.use('/api/patient',require('./routes/addedPatientside'));
app.use('/api/doctor',require('./routes/updateDoctorside'));    
app.use('/api/patient',require('./routes/updatePatientside'));
app.use('/api/patient',require('./routes/addmedtaken'));
app.use('/api/patient',require('./routes/deldocfrompat'));
app.use('/api/issue',require('./routes/addissue'));
app.use('/api/assistant',require('./routes/authAssistant'));
app.use('/api/assistant',require('./routes/addAssistant'));
app.use('/api/issue',require('./routes/deletePrescription'));
app.use('/api/issue',require('./routes/getissue'));
app.use('/api/issue',require('./routes/deleteIssue'));
app.use('/api/issue',require('./routes/getPrescription'));
app.use('/api/issue',require('./routes/updatePrescription'));
app.use('/api/issue',require('./routes/getPrescription2'));
app.use('/api/issue',require('./routes/addPrescription'));
app.use('/api/patient',require('./routes/deletePatient'));
app.use('/api/doctor',require('./routes/deleteDoctor'));
app.use('/api/doctor',require('./routes/searchDoctors'));
app.use('/api/doctor',require('./routes/searchHospitals'));
app.use('/api/doctor',require('./routes/updateReviews'));
app.use('/api/doctor',require('./routes/updateTotalStar'));
app.use('/api/doctor',require('./routes/updatedoctorphone'));
app.use('/api/patient',require('./routes/updatepatientphone'));
app.use('/api/shristi',require('./routes/addParticipant'));

app.use('/api/shristi',require('./routes/updateParticipant'));
app.use('/api/shristi',require('./routes/deleteParticipant')); 
app.use('/api/shristi',require('./routes/getParticipant'));
app.use('/api/shristi',require('./routes/getEvents'));
const PORT=process.env.PORT || 3000; 


app.listen(3000,console.log(`Server is running on port : ${PORT}`.red.underline.bold));
