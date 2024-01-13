const express=require('express');
const router=express.Router();
const Patient=require('../models/Patient');
const { Db } = require('mongodb');

router.get('/data',async(req,res,next)=>{
Patient.find((err,val)=>{
if(err){
    console.log(err);
}
else{
    res.json(val);
}
});
});
router.post('/auth',async (req,res,next)=>{

    const {password,phone}=req.body;
    try{
    let patient_exist=await Patient.findOne({phone:phone});
    console.log(patient_exist.password);
   // let doctor_exist=await Doctor.findOne({phone:phone});
    if(patient_exist){
        if(patient_exist.password==password){
        res.json({
            success:true,
            msg:"logged successfully",
            username:patient_exist.username,
            email:patient_exist.email,
            dob:patient_exist.dob,
            gender:patient_exist.gender,
            address:patient_exist.address
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