const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.delete('/deletePatient/:doctorPhone/:patientPhone', async (req, res, next) => {
    try {
        const { doctorPhone, patientPhone } = req.params; // Doctor's and patient's phone numbers

        // Find the doctor who has the patient in their patientadd field
        let doctor = await Doctor.findOne({ phone: doctorPhone, "patientadd.phone": patientPhone });

        if (!doctor) {
            return res.status(404).json({ success: false, msg: "No doctor found with the specified patient" });
        }

        // Remove the patient from the doctor's patientadd field
        doctor.patientadd = doctor.patientadd.filter(patient => patient.phone !== patientPhone);
        await doctor.save();

        res.json({ success: true, msg: "Patient deleted from doctor's records" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error" });
    }
});

module.exports = router;
