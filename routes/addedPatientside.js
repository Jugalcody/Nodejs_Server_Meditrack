const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { Db } = require('mongodb');

router.put('/addDoctor/:phone', async (req, res, next) => {
    try {
        const phone = req.params.phone;
        const doctoradd = req.body;

        // Check if the patient with the specified phone number exists
        const patientExist = await Patient.findOne({ phone: phone });

        if (!patientExist) {
            return res.status(404).json({ success: false, msg: "Patient not found" });
        }

        // Check if the doctor with the specified phone number already exists in the doctoradd array
        const doctorExists = patientExist.doctoradd.some(doctor => doctor.phone === doctoradd.phone);

        if (doctorExists) {
            return res.status(400).json({ success: false, msg: "Doctor already exists for this patient" });
        }

        // If the doctor doesn't exist, add it to the doctoradd array
        await Patient.findOneAndUpdate(
            { phone: phone },
            { $addToSet: { doctoradd: doctoradd } },
            { new: true }
        );

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error" });
    }
});

module.exports = router;
