const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.put('/updatephone', async (req, res, next) => {
    try {
        const { oldPhone, newPhone } = req.body;

        // Check if both old and new phone numbers are provided
        if (!oldPhone || !newPhone) {
            return res.status(400).json({ success: false, msg: 'Both old and new phone numbers are required' });
        }

        // Find the doctor by the old phone number
        let doctor = await Doctor.findOne({ phone: oldPhone });
        if (!doctor) {
            return res.status(404).json({ success: false, msg: 'Doctor not found' });
        }

        // Check if the new phone number already exists in the database
        const existingDoctorWithNewPhone = await Doctor.findOne({ phone: newPhone });
        if (existingDoctorWithNewPhone) {
            return res.status(400).json({ success: false, msg: 'New phone number already exists' });
        }

        // Update the doctor's profile with the new phone number
        doctor.phone = newPhone;
        await doctor.save();

        return res.status(200).json({ success: true, msg: 'Doctor profile updated successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
});

module.exports = router;
