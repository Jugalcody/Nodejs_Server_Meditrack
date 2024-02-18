const express=require('express');
const router=express.Router();
const Patient=require('../models/Patient');
const { Db } = require('mongodb');

router.post('/search',async (req,res,next)=>{

    const {phone}=req.body;
    try{
    let patient_exist=await Patient.findOne({phone:phone});
    if(patient_exist){
       
        res.json({
            connected:false,
            phone:patient_exist.phone,
            username:patient_exist.username,
            email:patient_exist.email,
            dob:patient_exist.dob,
            gender:patient_exist.gender,
            address:patient_exist.address,
            doctoradd:patient_exist.doctoradd
        });
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
            msg:"failed"
        })
    }
})

module.exports=router;