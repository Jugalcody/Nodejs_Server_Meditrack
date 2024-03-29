const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    dept: {
        type: String
    },
    event: [{
        name: String,
        participants: [{
            name: String,
            phone: String,
            college:String,
            time:String,
            score:String
            // Add other participant fields here if neede
        }]
    }]
});

module.exports = mongoose.model('Shristi', userSchema);
