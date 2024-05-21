const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.put('/updatepending/:phone', async (req, res, next) => {
    try {
        const phone = req.params.phone;
        const patientData = req.body;

        let doctorExist = await Doctor.findOne({ phone: phone });

        if (!doctorExist) {
            return res.status(404).json({ success: false, msg: "Doctor not found" });
        }

        const patientIndex = doctorExist.patientadd.findIndex(patient => patient.phone === patientData.phone);

        if (patientIndex === -1) {
            return res.status(404).json({ success: false, msg: "No patient found" });
        }

        if (patientData.pending === "delete") {
            // Remove the patient with the specified phone from the patientadd array
            await doctorExist.updateOne({ $pull: { patientadd: { phone: patientData.phone } } });
        } else {
            // Update only the 'pending' key in the patientadd array
            await doctorExist.updateOne({ $set: { [`patientadd.${patientIndex}.pending`]: patientData.pending } });
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error" });
    }
});

module.exports = router;
