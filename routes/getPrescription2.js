const express = require('express');
const router = express.Router();
const User = require('../models/Prescription');

router.get('/getPrescriptions/:idno/:issueid/:pid', async (req, res, next) => {
    const { idno, issueid, pid } = req.params;

    try {
        // Find the user by idno
        const user = await User.findOne({ idno: idno });

        if (!user) {
            return res.json({
                success: false,
                msg: "User not found"
            });
        }

        // Find the issue by issueid
        const issue = user.issue.find(issue => issue.issueid === issueid);

        if (!issue) {
            return res.json({
                success: false,
                msg: "Issue not found"
            });
        }

        // Find the prescription by pid
        const prescription = issue.prescription.find(prescription => prescription.pid === pid);

        if (!prescription) {
            return res.json({
                success: false,
                msg: "Prescription not found"
            });
        }

        // Extract and return the prescription
        res.json({
            success: true,
            prescription: prescription
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router;
