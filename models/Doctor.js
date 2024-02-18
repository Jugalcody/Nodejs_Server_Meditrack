const mongoose=require('mongoose');
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
address:{
    type:String
},
speciality:{
    type:String

},
yoe:{
    type:String
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
}
});

module.exports=mongoose.model('Doctor',userSchema);