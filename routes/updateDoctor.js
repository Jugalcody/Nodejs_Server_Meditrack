const express=require('express');
const router=express.Router();
const Patient=require('../models/Doctor');
const { Db } = require('mongodb');

router.put('/update/:phone',async (req,res,next)=>{

    
    try{
        const {phone}=req.params;
    let patient_exist=await Patient.findOneAndUpdate({phone:phone},req.body,{new:true});
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