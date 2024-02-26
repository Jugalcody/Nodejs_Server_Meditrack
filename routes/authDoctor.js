const express=require('express');
const router=express.Router();
const Doctor=require('../models/Doctor');
const { Db } = require('mongodb');

router.post('/auth',async (req,res,next)=>{

    const {phone,password}=req.body;
    
    try{
    let doctor_exist=await Doctor.findOne({phone:phone});
    console.log("password : "+doctor_exist.password);

    if(doctor_exist){
        if(doctor_exist.password==password){
        res.json({
            success:true,
            msg:"logged successfully",
            username:doctor_exist.username,
            email:doctor_exist.email,
            dob:doctor_exist.dob,
            gender:doctor_exist.gender,
            state:doctor_exist.state,
            city:doctor_exist.city,
            speciality:doctor_exist.speciality,
            yoe:doctor_exist.yoe,
            qualification:doctor_exist.qualification,
            about:doctor_exist.about,
            clinic_hospital:doctor_exist.clinic_hospital,
            totalStar:doctor_exist.totalStar,
            reviews:doctor_exist.reviews,
            photo:doctor_exist.photo,
            photoid:doctor_exist.photoid

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
        msg:"user doesn't exists de"
    })
}
    }
    catch(err){
        res.json({
            success:false,
            msg:"user doesn't exists baba"
        })
    }
})

module.exports=router;