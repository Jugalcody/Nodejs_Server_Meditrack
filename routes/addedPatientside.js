const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { Db } = require('mongodb');

router.put('/addPatient/:phone', async (req, res, next) => {
    try {
        const phone = req.params.phone; // Doctor's phone number
        const patientadd = req.body; // Contains the patient details to add

        // Check if the doctor with the specified phone number exists
        const doctorExist = await Doctor.findOne({ phone: phone });

        if (!doctorExist) {
            return res.json({ success: false, msg: "Doctor not found" });
        }

        // Check if the patient with the specified phone number already exists in the patientadd array
        const patientExists = doctorExist.patientadd.some(patient => patient.phone === patientadd.phone);

        if (patientExists) {
            return res.json({ success: false, msg: "Patient already exists for this doctor" });
        }

        // If the patient doesn't exist, add it to the patientadd array
        await Doctor.findOneAndUpdate(
            { phone: phone },
            { $addToSet: { patientadd: patientadd } },
            { new: true }
        );

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: "Error" });
    }
});

module.exports = router;
