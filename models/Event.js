const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 
        event: [{
            name: String,
            image:String,
            date: String,
            time:String,
            desc:String,
            venue:String,
            clubName:String,
        }]
});

module.exports = mongoose.model('Event', userSchema);
