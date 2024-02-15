const express=require('express');
const router=express.Router();
const Doctor=require('../models/Doctor');
const { Db } = require('mongodb');

router.put('/addPatient/:phone',async (req,res,next)=>{

    
    try{
        const {phone,patient}=req.params;
    let doctor_exist=await Doctor.findOneAndUpdate({phone:phone},req.body,{new:true});
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