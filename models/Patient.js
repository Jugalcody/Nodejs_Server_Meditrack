const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    loggedAs:{
        type:String,
        
    },
username : {
    type:String,
    
},
email:{
    type:String,
    
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
    
},
gender:{
type:String,

},
address:{
    type:String,
    
},
doctoradd:{
    type:[mongoose.Schema.Types.Mixed]
}
});

module.exports=mongoose.model('Patient',userSchema);