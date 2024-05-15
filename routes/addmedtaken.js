const express = require('express');
const router = express.Router();
const User = require('../models/Prescription');

router.post('/updateTaken', async (req, res, next) => {
    const { idno, issueid, prescriptionId, medid } = req.body;

    try {
        // Find the user by idno
        let user = await User.findOne({ idno: idno });

        if (!user) {
            return res.json({
                success: false,
                msg: "User not found"
            });
        }

        // Find the index of the issue with the specified issueId
        const issueIndex = user.issue.findIndex(issue => issue.issueid === issueid);

        if (issueIndex === -1) {
            return res.json({
                success: false,
                msg: "Issue not found"
            });
        }

        // Find the prescription with the specified prescriptionId
        const prescription = user.issue[issueIndex].prescription.find(presc => presc.pid === prescriptionId);

        if (!prescription) {
            return res.json({
                success: false,
                msg: "Prescription not found"
            });
        }

        // Find the medicine with the specified medid
        const medicineIndex = prescription.medicine.findIndex(med => med.medid === medid);

        if (medicineIndex === -1) {
            return res.json({
                success: false,
                msg: "Medicine not found in the prescription"
            });
        }

        // Increment the 'taken' field by 1
        user.issue[issueIndex].prescription[prescriptionId].medicine[medicineIndex].taken++;

        // Save the updated user
        await user.save();

        res.json({
            success: true,
            msg: "Medicine 'taken' field updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router;
