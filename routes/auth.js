const express=require('express');
const router=express.Router();

const Doctor=require('../models/Doctor');
const Patient=require('../models/Patient');
const { Db } = require('mongodb');

router.get('/dat',async(req,res,next)=>{
User.find((err,val)=>{
if(err){
    console.log(err);
}
else{
    res.json(val);
}
});
});
router.post('/log',async (req,res,next)=>{

    const {username,email,password,place}=req.body;
    try{
    let patient_exist=await Patient.findOne({phone:phone});
    let doctor_exist=await Doctor.findOne({phone:phone});
    if(patient_exist){
        res.json({
            success:true,
            msg:"Patient logged in"
        });
    }
    else if(doctor_exist){
        res.json({
            success:true,
            msg:"Doctor logged in"
        }); 
    }else{
    res.json({
        success:false,
        msg:"failed"
    })
}
    }
    catch(err){
        console.log(err);
    }
})

module.exports=router;