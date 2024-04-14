const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

router.put('/update/:phone', async (req, res, next) => {
    try {
        const { phone } = req.params;

        // Find the patient by phone number
        let patient = await Patient.findOne({ phone: phone });
        if (!patient) {
            return res.status(404).json({ success: false, msg: 'Patient not found' });
        }

        // Get the number of connected doctors
        const numDoctors = patient.doctoradd.length;

        // Update the patient's profile
        patient = await Patient.findOneAndUpdate({ phone: phone }, req.body, { new: true });

        // Update the patient's changes to their connected doctors' profiles
        const doctors = await Doctor.find({ patientadd: { $elemMatch: { phone: phone } } });
        for (let i = 0; i < doctors.length; i++) {
            const doctor = doctors[i];
            const patientIndex = doctor.patientadd.findIndex(p => p.phone === phone);
            if (patientIndex !== -1) {
                doctor.patientadd[patientIndex] = { ...doctor.patientadd[patientIndex], ...req.body };
                await doctor.save();
            }
        }

        res.json({ success: true, msg: 'Patient profile updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
});

module.exports = router;
