const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

router.put('/delete/:phone', async (req, res, next) => {
    try {
        const { phone } = req.params;
        let doctor_exist = await Doctor.findOne({ phone: phone });

        if (doctor_exist) {
            // Find all patients who have the doctor in their doctoradd field
            let patients = await Patient.find({ "doctoradd.phone": phone });

            // Update each patient to replace the doctor's phone number with an empty string in their doctoradd field
            for (let patient of patients) {
                patient.doctoradd = patient.doctoradd.map(doctor => {
                    if (doctor.phone === phone) {
                        return { ...doctor, phone: phone+"del" };
                    }
                    return doctor;
                });
                await patient.save();
            }

            // Delete the doctor
            await doctor_exist.deleteOne();
            res.json({ success: true });
        } else {
            res.json({ success: "no doctor found" });
        }
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            msg: "error"
        });
    }
});

module.exports = router;
