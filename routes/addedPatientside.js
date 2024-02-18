const express=require('express');
const router=express.Router();
const Patient=require('../models/Patient');
const { Db } = require('mongodb');

router.put('/addDoctor/:phone',async (req,res,next)=>{

    
    try{
        const phone = req.params.phone; 
        const doctoradd = req.body;
        let patient_exist = await Patient.findOneAndUpdate(
            { phone: phone },
            { $addToSet: { doctoradd: doctoradd } }, 
            { new: true } 
        );
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