const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.delete('/deleteDoctor/:patientPhone/:doctorPhone', async (req, res, next) => {
    try {
        const { patientPhone, doctorPhone } = req.params; // Patient's phone number and doctor's phone number to be deleted

        // Find the patient who has the doctor in their doctoradd field
        let patient = await Patient.findOne({ phone: patientPhone, "doctoradd.phone": doctorPhone });

        if (!patient) {
            return res.status(404).json({ success: false, msg: "No patient found with the specified doctor" });
        }

        // Remove the doctor from the patient's doctoradd field
        patient.doctoradd = patient.doctoradd.filter(doctor => doctor.phone !== doctorPhone);
        await patient.save();

        res.json({ success: true, msg: "Doctor deleted from patient's records" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error" });
    }
});

module.exports = router;
