const express = require('express');
const router = express.Router();
const User = require('../models/Prescription');

router.get('/getissue/:idno', async (req, res, next) => {
    const idno = req.params.idno;

    try {
        // Find the user by idno
        const user = await User.findOne({ idno: idno });

        if (!user) {
            return res.json({
                success: false,
                msg: "User not found"
            });
        }

        // Extract and return the issues
        const issues = user.issue;

        res.json({
            success: true,
            issues: issues
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router;
