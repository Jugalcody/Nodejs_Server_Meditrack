const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.put('/review/:phone', async (req, res, next) => {
    try {
        const phone = req.params.phone;
        const review = req.body;

        // Update the doctor's reviews
        await Doctor.findOneAndUpdate(
            { phone: phone },
            { $addToSet: { reviews: review } }
        );

        // Calculate the new total star rating
        const doctor = await Doctor.findOne({ phone: phone });
        const totalStar = calculateTotalStar(doctor.reviews);

        // Update the doctor's total star rating
        await Doctor.findOneAndUpdate(
            { phone: phone },
            { $set: { totalStar: totalStar } }
        );

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false, msg: "Error updating review and total star" });
    }
});

// Function to calculate the total star rating
function calculateTotalStar(reviews) {
    let totalStars = 0;

    // Calculate the sum of stars from all reviews
    reviews.forEach(review => {
        totalStars += review.star;
    });

    // Calculate the average star rating
    const totalReviews = reviews.length;
    const avgStar = totalStars / totalReviews;

    // Convert the average star rating to a scale of 5
    const totalStar = avgStar * 5;

    return totalStar.toFixed(1); // Round to 1 decimal place
}

module.exports = router;
