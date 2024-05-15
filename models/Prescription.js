const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idno:{
type:String,
required:true
    },
    sign:String,
    issue:[ {
        issuetitle : String,
    date: String,
    time:String,
    issueid:String,
    prescription: [{
           pid:String,
            note : String,
            date: String,
            time:String,
            medicine : [{ 
                medid:String,
                name:String,
                taken:String,
                dosage:{
                    morning:String,
                    afternoon:String,
                    evening:String,
                    night:String
                },
                quantity:String,
                duration:{
                    start: String,
                    end:String
                }
            }],
            test : [{
                name:String,
                status:String
            }]
        }]
    }]


});

module.exports = mongoose.model('Prescription', userSchema);
