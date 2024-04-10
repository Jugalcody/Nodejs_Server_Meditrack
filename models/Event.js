const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 
        event: [{
            name: String,
            date: String,
            desc:String,
            venue:String,
            dept:String,
        }]
});

module.exports = mongoose.model('Event', userSchema);
