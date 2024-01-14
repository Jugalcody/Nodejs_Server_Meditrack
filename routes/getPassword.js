const express=require('express');
const router=express.Router();
const Patient=require('../models/Patient');
const { Db } = require('mongodb');

router.post('/getPassword',async (req,res,next)=>{

    const {phone}=req.body;
    try{
    let patient_exist=await Patient.findOne({phone:phone});
    if(patient_exist){
       
        res.json({
            success:true,
          password:patient_exist.password
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