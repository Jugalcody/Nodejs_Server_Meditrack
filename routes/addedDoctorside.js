const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { Db } = require('mongodb');

router.put('/addDoctor/:phone', async (req, res, next) => {
    try {
        const phone = req.params.phone; // Patient's phone number
        const doctoradd = req.body; // Contains the doctor details to add

        // Check if the patient with the specified phone number exists
        const patientExist = await Patient.findOne({ phone: phone });

        if (!patientExist) {
            return res.json({ success: false, msg: "Patient not found" });
        }

        // Check if the doctor with the specified phone number already exists in the doctoradd array
        const doctorExists = patientExist.doctoradd.some(doctor => doctor.phone === doctoradd.phone);

        if (doctorExists) {
            return res.json({ success: false, msg: "Doctor already exists for this patient" });
        }

        // Add the doctor to the doctoradd array for the patient
        patientExist.doctoradd.push(doctoradd);

        // Save the updated patient document
        await patientExist.save();

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: "Error" });
    }
});

module.exports = router;
