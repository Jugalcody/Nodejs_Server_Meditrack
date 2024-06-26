const express = require('express');
const router = express.Router();
const User = require('../models/Prescription');

router.post('/updateTaken', async (req, res, next) => {
    const { idno, issueid, prescriptionId, medid ,date} = req.body;

    try {
        // Find the user by idno
        let user = await User.findOne({ idno: idno });

        console.log('user:', user);

        if (!user) {
            return res.json({
                success: false,
                msg: "User not found"
            });
        }

        // Find the index of the issue with the specified issueId
        const issueIndex = user.issue.findIndex(issue => issue.issueid === issueid);

        console.log('issueIndex:', issueIndex);

        if (issueIndex === -1) {
            return res.json({
                success: false,
                msg: "Issue not found"
            });
        }

        // Find the prescription with the specified prescriptionId
        const prescription = user.issue[issueIndex].prescription.find(presc => presc.pid === prescriptionId);

        console.log('prescription:', prescription);

        if (!prescription) {
            return res.json({
                success: false,
                msg: "Prescription not found"
            });
        }

        // Check if medicine is defined
        if (!prescription.medicine || !Array.isArray(prescription.medicine)) {
            return res.json({
                success: false,
                msg: "Medicine not found or not properly defined in the prescription"
            });
        }

        // Find the medicine with the specified medid
        const medicineIndex = prescription.medicine.findIndex(med => med.medid === medid);

        console.log('medicineIndex:', medicineIndex);

        if (medicineIndex === -1) {
            return res.json({
                success: false,
                msg: "Medicine not found in the prescription"
            });
        }

        // Print the current value of 'taken'
        console.log('Current taken:', prescription.medicine[medicineIndex].taken);

        // Update 'taken' and add current date
        const medicine = prescription.medicine[medicineIndex];

        console.log('medicine:', medicine);

        if (!medicine) {
            return res.json({
                success: false,
                msg: "Medicine not found in the prescription"
            });
        }

        // Convert 'taken' from string to integer, increment, then convert back to string
        
        const currentDate = new Date();
        const day = ('0' + currentDate.getDate()).slice(-2);
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const year = currentDate.getFullYear();
        const date = `${day}/${month}/${year}`;
        
        medicine.taken = String(parseInt(medicine.taken, 10) + 1)+"@"+date;
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
