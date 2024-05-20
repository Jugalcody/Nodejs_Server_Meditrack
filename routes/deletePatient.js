const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

router.put('/delete/:phone', async (req, res, next) => {
    try {
        const { phone } = req.params;

        // Check if the phone number belongs to a patient
        let patient_exist = await Patient.findOne({ phone: phone });
        if (patient_exist) {
            // Find all doctors who have the patient in their patientadd field
            let doctors = await Doctor.find({ "patientadd.phone": phone });

            // Update each doctor to replace the patient's phone number with an empty string in their patientadd field
            for (let doctor of doctors) {
                doctor.patientadd = doctor.patientadd.map(patient => {
                    if (patient.phone === phone) {
                        return { ...patient, phone: phone+"del" };
                    }
                    return patient;
                });
                await doctor.save();
            }

            // Delete the patient
            await patient_exist.deleteOne();
            return res.json({ success: true, msg: 'Patient deleted' });
        }

        // If no patient is found
        res.json({ success: false, msg: 'No patient found' });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            msg: "error"
        });
    }
});

module.exports = router;
