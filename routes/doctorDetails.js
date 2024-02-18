const express=require('express');
const router=express.Router();
const Patient=require('../models/Doctor');
const { Db } = require('mongodb');

router.post('/getDetails',async (req,res)=>{
    const {phone}=req.body;
    try{
    let patient_exist=await Patient.findOne({phone:phone});
    if(patient_exist){
       
        res.json({
            success:true,
            username:patient_exist.username,
            email:patient_exist.email,
          password:patient_exist.password,
          phone:patient_exist.phone,
          dob:patient_exist.dob,
          gender:patient_exist.gender,
          address:patient_exist.address,
          speciality:patient_exist.speciality,
          qualification:patient_exist.qualification,
          clinic_hospital:patient_exist.clinic_hospital,
          patientadd:patient_exist.patientadd
        });
    }else{
    res.json({
        success:false,
        msg:"failed"
    })
}
    }
    catch(err){
        res.json({
            success:false,
            msg:"failed"
        })
    }
})

module.exports=router;