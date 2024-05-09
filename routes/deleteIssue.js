const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

router.delete('/deleteIssue/:issueid', async (req, res, next) => {
    const { issueid } = req.params;

    try {
        // Find the issue by issueid
        let issueExist = await Prescription.findOne({ "issue.issueid": issueid });
        
        if (issueExist) {
            // Delete the issue
            await Prescription.updateOne(
                { "issue.issueid": issueid },
                { $pull: { "issue": { issueid: issueid } } }
            );
            res.json({ success: true, msg: "Issue deleted successfully" });
        } else {
            res.json({ success: false, msg: "Issue not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router;
