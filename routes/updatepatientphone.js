const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.put('/updatephone', async (req, res, next) => {
    try {
        const { oldPhone, newPhone } = req.body;

        // Check if both old and new phone numbers are provided
        if (!oldPhone || !newPhone) {
            return res.status(400).json({ success: false, msg: 'Both old and new phone numbers are required' });
        }

        // Find the patient by the old phone number
        let patient = await Patient.findOne({ phone: oldPhone });
        if (!patient) {
            return res.status(404).json({ success: false, msg: 'Patient not found' });
        }

        // Check if the new phone number already exists in the database
        const existingPatientWithNewPhone = await Patient.findOne({ phone: newPhone });
        if (existingPatientWithNewPhone) {
            return res.status(400).json({ success: false, msg: 'New phone number already exists' });
        }

        // Update the patient's profile with the new phone number
        patient.phone = newPhone;
        await patient.save();

        return res.status(200).json({ success: true, msg: 'Patient profile updated successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
});

module.exports = router;
