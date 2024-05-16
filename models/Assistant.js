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
state:{
    type:String
},
city:{
type:String
},
photo:{
    type:String
}
});

module.exports=mongoose.model('Assistant',userSchema);