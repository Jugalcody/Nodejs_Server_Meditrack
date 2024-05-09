const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

router.delete('/deletePrescription/:pid', async (req, res, next) => {
    const { pid } = req.params;

    try {
        // Find the prescription by pid
        let prescriptionExist = await Prescription.findOne({ "issue.prescription.pid": pid });
        
        if (prescriptionExist) {
            // Delete the prescription
            await Prescription.updateOne(
                { "issue.prescription.pid": pid },
                { $pull: { "issue.$.prescription": { pid: pid } } }
            );
            res.json({ success: true, msg: "Prescription deleted successfully" });
        } else {
            res.json({ success: false, msg: "Prescription not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router;
