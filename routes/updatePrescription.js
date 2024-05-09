const express = require('express');
const router = express.Router();
const User = require('../models/Prescription');

router.post('/updatePrescription', async (req, res, next) => {
    const { idno, issueid, note, medicine, test, pid } = req.body;
    const currentDate = new Date();
    const day = ('0' + currentDate.getDate()).slice(-2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const year = currentDate.getFullYear();
    const hour = ('0' + currentDate.getHours()).slice(-2);
    const minute = ('0' + currentDate.getMinutes()).slice(-2);
    const sec = ('0' + currentDate.getSeconds()).slice(-2);
    const newPid = `${hour}${minute}${sec}@${day}${month}${year}`;
    const date = `${day}/${month}/${year}`;
    const time = `${hour}:${minute}:${sec}`;

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

        // Find the index of the prescription with the specified pid
        const prescriptionIndex = user.issue[issueIndex].prescription.findIndex(presc => presc.pid === pid);

        if (prescriptionIndex !== -1) {
            // Update the existing prescription
            user.issue[issueIndex].prescription[prescriptionIndex] = {
                pid: pid,
                time: time,
                note: note,
                medicine: medicine,
                test: test,
                date: date
            };
        } else {
            // Add new prescription to the issue
            user.issue[issueIndex].prescription.push({
                pid: newPid,
                time: time,
                note: note,
                medicine: medicine,
                test: test,
                date: date
            });
        }

        // Save the updated user
        await user.save();

        res.json({
            success: true,
            msg: "Prescription added/updated to the specified issue"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router;
