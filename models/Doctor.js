const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    loggedAs:{
        type:String,
        required:true
    },
username : {
    type:String,
    required:true
},
email:{
    type:String,
    required:true
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
    type:String,
    required:true
},
gender:{
type:String,
required:true
},
address:{
    type:String,
    required:true
},
speciality:{
    type:String,
    required:true
},
yoe:{
    type:String,
    required:true
},
qualification:{
    type:String,
    required:true
},
about:{
    type:String,
    required:true
},
clinic_hospital:{
    type:Array,
    required:true
}
});

module.exports=mongoose.model('Doctor',userSchema);