const express=require('express');
const router=express.Router();
const Patient=require('../models/Patient');
const { Db } = require('mongodb');

router.put('/delete/:phone',async (req,res,next)=>{

    
    try{

        const {phone}=req.params;
    let patient_exist=await Patient.findOne({phone:phone});
    if(patient_exist){
       await patient_exist.deleteOne({phone:phone});
    }

    res.json({success:true});
    }
    catch(err){
        res.json({
            success:false,
            msg:"error"
        })
    }
})

module.exports=router;