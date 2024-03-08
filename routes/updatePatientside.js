const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { Db } = require('mongodb');

router.put('/updatepending/:phone', async (req, res, next) => {
    try {
        const phone = req.params.phone;
        const doctorData = req.body;

        let patientExist = await Patient.findOne({ phone: phone });

        if (!patientExist) {
            return res.status(404).json({ success: false, msg: "Patient not found" });
        }

        const patientIndex = patientExist.doctoradd.findIndex(patient => patient.phone === doctorData.phone);

        if (patientIndex === -1) {
            return res.status(404).json({ success: false, msg: "no Doctor found" });
        }

        if (doctorData.pending === "delete") {
            // Remove the doctor with the specified phone from the doctoradd array
            await patientExist.updateOne({ $pull: { doctoradd: { phone: doctorData.phone } } });
        } else {
            // Update only the 'pending' key in the doctoradd array
            await patientExist.updateOne({ $set: { [`doctoradd.${patientIndex}.pending`]: doctorData.pending } });
        }

        res.json({ success: true });
    } catch (err) {const express = require('express');
    const router = express.Router();
    const Patient = require('../models/Patient');
    const { Db } = require('mongodb');
    
    router.put('/updatepending/:phone', async (req, res, next) => {
        try {
            const phone = req.params.phone;
            const doctorData = req.body;
    
            let patientExist = await Patient.findOne({ phone: phone });
    
            if (!patientExist) {
                return res.status(404).json({ success: false, msg: "Patient not found" });
            }
    
            const patientIndex = patientExist.doctoradd.findIndex(patient => patient.phone === doctorData.phone);
    
            if (patientIndex === -1) {
                return res.status(404).json({ success: false, msg: "no Doctor found" });
            }
    
            if (doctorData.pending === "delete") {
                // Remove the doctor with the specified phone from the doctoradd array
                await patientExist.updateOne({ $pull: { doctoradd: { phone: doctorData.phone } } });
            } else {
                // Update only the 'pending' key in the doctoradd array
                await patientExist.updateOne({ $set: { [`doctoradd.${patientIndex}.pending`]: doctorData.pending } });
            }
    
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error" });
        }
    });
    
    module.exports = router;
    
        console.error(err);
        res.status(500).json({ success: false, msg: "Error" });
    }
});

module.exports = router;
