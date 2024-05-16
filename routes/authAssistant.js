const express=require('express');
const router=express.Router();
const Patient=require('../models/Assistant');
const { Db } = require('mongodb');

router.post('/auth',async (req,res,next)=>{

    const {password,phone}=req.body;
    try{
    let patient_exist=await Patient.findOne({phone:phone});
    if(patient_exist){
        if(patient_exist.password==password){
        res.json({
            success:true,
            msg:"logged successfully",
            username:patient_exist.username,
            email:patient_exist.email,
          password:patient_exist.password,
          phone:patient_exist.phone,
          dob:patient_exist.dob,
          gender:patient_exist.gender,
          city:patient_exist.city,
          state:patient_exist.state,
          photo:patient_exist.photo,
          doctoradd:patient_exist.doctoradd
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
})

module.exports=router;