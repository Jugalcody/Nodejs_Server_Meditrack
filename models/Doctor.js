const { Int32 } = require('bson');
const mongoose=require('mongoose');
const { float } = require('webidl-conversions');
const userSchema=new mongoose.Schema({
    loggedAs:{
        type:String
    },
username : {
    type:String
},
email:{
    type:String
},
password:{
    type:String,
    required:true
},
phone:{
type:String,
required:true
},
dob:{
    type:String
},
gender:{
type:String
},
state:{
    type:String
},
city:{
type:String
},
speciality:{
    type:String

},
yoe:{
    type:Number
},
qualification:{
    type:String
},
about:{
    type:String
},
clinic_hospital:{
    type:Object
},
patientadd:{
    type:[mongoose.Schema.Types.Mixed]
    
},
totalStar:{
type:String
},
reviews:{
    type:[mongoose.Schema.Types.Mixed]
},
photo:{
    type:String
},
photoid:{
    type:String
}
});

module.exports=mongoose.model('Doctor',userSchema);