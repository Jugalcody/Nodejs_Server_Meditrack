const express=require('express');
const router=express.Router();
const User=require('../models/Patient');
const { Db } = require('mongodb');

router.get('/patientData',async(req,res,next)=>{
User.find((err,val)=>{
if(err){
    console.log(err);
}
else{
    res.json(val);
}
});
});
router.post('/register',async (req,res,next)=>{

    const {doctor_patient,username,email,password,phone,dob,gender,address}=req.body;
    try{
    let user_exist=await User.findOne({phone:phone});
    if(user_exist){
        res.json({
            success:false,
            msg:"User already exists"
        });
    }
    let user=new User();
    user.loggedAs=doctor_patient;
    user.username=username;
    user.email=email;
    user.password=password;
    user.phone=phone;
    user.dob=dob;
    user.gender=gender;
    user.address=address;
    
    await user.save();
    res.json({
        success:true,
        msg:"user registered"
    })
    }
    catch(err){
        console.log(err);
    }
})

module.exports=router;