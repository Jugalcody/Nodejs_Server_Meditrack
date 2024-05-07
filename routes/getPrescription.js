const express = require('express');
const router = express.Router();
const User = require('../models/Prescription');

router.get('/getPrescriptions/:idno/:issueid', async (req, res, next) => {
    const { idno, issueid } = req.params;

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

        // Extract and return the prescriptions for the specific issue
        const prescriptions = issue.prescription;

        res.json({
            success: true,
            prescriptions: prescriptions
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router;
