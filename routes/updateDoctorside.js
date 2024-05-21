const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.put('/updatepending/:phone', async (req, res, next) => {
    try {
        const phone = req.params.phone; 
        const doctorData = req.body;

        let patientExist = await Patient.findOne({ phone: phone });

        if (!patientExist) {
            return res.status(404).json({ success: false, msg: "Patient not found" });
        }

        const doctorIndex = patientExist.doctoradd.findIndex(doctor => doctor.phone === doctorData.phone);

        if (doctorIndex === -1) {
            return res.status(404).json({ success: false, msg: "No doctor found" });
        }

        if (doctorData.pending === "delete") {
            await patientExist.updateOne({ $pull: { doctoradd: { phone: doctorData.phone } } });
        } else {
            patientExist.doctoradd[doctorIndex] = doctorData;
            await patientExist.save();
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Error" });
    }
});

module.exports = router;
