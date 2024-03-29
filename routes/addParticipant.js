const express = require('express');
const router = express.Router();
const User = require('../models/Shristi');

router.post('/add', async (req, res, next) => {
    const { dept, eventName, participant } = req.body;
    try {
        let user = await User.findOne({ dept: dept });

        // Check if the department exists
        if (!user) {
            // Create a new department if it doesn't exist
            user = new User({ dept: dept, event: [] });
        }

        // Check if the event exists within the department
        let event = user.event.find(e => e.name === eventName);



        if (!event) {
    
            user.event.push({"participants":participant,"name":eventName});
            await user.save(); 
            return res.json({
                success: true,
                msg: "Participant added to the event"
            });

        }
        else{

        // Assign the event name to the participant object
      //  participant.eventName = eventName;

        // Check if the participant already exists for this event
        const existingParticipant = event.participants.some(p => p.phone === participant.phone);

        if (existingParticipant) {
            return res.json({
                success: false,
                msg: "Participant already exists for this event"
            });
        } 

        // Add the participant to the event
     event.participants.push(participant);

        // Save the updated user document
        await user.save();

        return res.json({
            success: true,
            msg: "Participant added to the event"
        });
    }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});

module.exports = router;
