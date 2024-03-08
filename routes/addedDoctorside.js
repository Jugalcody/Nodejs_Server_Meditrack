const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { Db } = require('mongodb');

router.put('/addPatient/:phone', async (req, res, next) => {
    try {
        const phone = req.params.phone;
        const patientadd = req.body;

        // Check if the doctor with the given phone number already exists
        let doctor_exist = await Doctor.findOne({ phone: phone });

        if (!doctor_exist) {
            // If the doctor does not exist, return an error
            return res.json({ success: false, msg: "Doctor not found" });
        }

        // Check if the patient's phone number already exists in the patientadd array
        const patientExists = doctor_exist.patientadd.some(patient => patient.phone === patientadd.phone);

        if (patientExists) {
            // If the patient already exists, return an error
            return res.json({ success: false, msg: "Patient already exists for this doctor" });
        }

        // Add the patient to the patientadd array for the doctor
        doctor_exist.patientadd.push(patientadd);
        
        // Save the updated doctor document
        await doctor_exist.save();

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: "Error" });
    }
});

module.exports = router;
