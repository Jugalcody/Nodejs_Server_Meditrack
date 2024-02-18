const express=require('express');
const router=express.Router();
const Doctor=require('../models/Doctor');
const { Db } = require('mongodb');

router.put('/delete/:phone',async (req,res,next)=>{

    
    try{

        const {phone}=req.params;
    let doctor_exist=await Doctor.findOne({phone:phone});
    if(doctor_exist){
       await doctor_exist.deleteOne({phone:phone});
       res.json({success:true});
    }
else{
    res.json({success:"no doctor found"});
}
    }
    catch(err){
        res.json({
            success:false,
            msg:"error"
        })
    }
})

module.exports=router;