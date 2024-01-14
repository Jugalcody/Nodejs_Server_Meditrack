const express=require('express');
const router=express.Router();
const User=require('../models/Doctor');
const { Db } = require('mongodb');

router.get('/data',async(req,res,next)=>{
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

    const {doctor_patient,username,email,password,phone,dob,gender,address,speciality,yoe,qualification,about,clinic_hospital}=req.body;
    try{
    let user_exist=await User.findOne({phone:phone});
    if(user_exist){
        res.json({
            success:false,
            msg:"User already exists"
        });
    }
    else{
    let user=new User();
    user.loggedAs=doctor_patient;
    user.username=username;
    user.email=email;
    user.password=password;
    user.phone=phone;
    user.dob=dob;
    user.gender=gender;
    user.address=address;
    user.speciality=speciality;
    user.yoe=yoe;
    user.qualification=qualification;
    user.about=about;
    user.clinic_hospital=clinic_hospital;
    await user.save();
    res.json({
        success:true,
        msg:"user registered"
    })
    }}
    catch(err){
        console.log(err);
    }
});

router.post('/auth',async (req,res,next)=>{

    const {password,phone}=req.body;
    try{
    let doctor_exist=await Doctor.findOne({phone:phone});
    console.log(doctor_exist.password);

    if(doctor_exist){
        if(doctor_exist.password==password){
        res.json({
            success:true,
            msg:"logged successfully",
            username:doctor_exist.username,
            email:doctor_exist.email,
            dob:doctor_exist.dob,
            gender:doctor_exist.gender,
            address:doctor_exist.address,
            speciality:doctor_exist.speciality,
            yoe:doctor_exist.yoe,
            qualification:doctor_exist.qualification,
            about:doctor_exist.about,
            clinic_hospital:doctor_exist.clinic_hospital
        });
    }
    else{
        res.json({
            success:false,
            msg:"wrong password"
        });
    }
    }else{
    res.json({
        success:false,
        msg:"user doesn't exists"
    })
}
    }
    catch(err){
        res.json({
            success:false,
            msg:"user doesn't exists"
        })
    }
});





module.exports=router;