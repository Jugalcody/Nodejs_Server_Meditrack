const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

router.put('/update/:phone', async (req, res, next) => {
    try {
        const { phone } = req.params;

        // Find the doctor by phone number
        let doctor = await Doctor.findOne({ phone: phone });
        if (!doctor) {
            return res.status(404).json({ success: false, msg: 'Doctor not found' });
        }

        // Get the number of connected patients
        const numPatients = doctor.patientadd.length;

        // Update the doctor's profile
        doctor = await Doctor.findOneAndUpdate({ phone: phone }, req.body, { new: true });

        // Update the doctor's changes to their connected patients' profiles
        const patients = await Patient.find({ doctoradd: { $elemMatch: { phone: phone } } });
        for (let i = 0; i < patients.length; i++) {
            const patient = patients[i];
            const doctorIndex = patient.doctoradd.findIndex(d => d.phone === phone);
            if (doctorIndex !== -1) {
                patient.doctoradd[doctorIndex] = { ...patient.doctoradd[doctorIndex], ...req.body };
                await patient.save();
            }
        }

        res.json({ success: true, msg: 'Doctor profile updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
});

module.exports = router;
