const express=require('express');
const router=express.Router();
const Doctor=require('../models/Doctor');
const { Db } = require('mongodb');

router.put('/addPatient/:phone',async (req,res,next)=>{

    
    try{
        const phone = req.params.phone; // Access phone from params
        const patientadd = req.body;
        let doctor_exist = await Doctor.findOneAndUpdate(
            { phone: phone },
            { $addToSet: { patientadd: patientadd } }, // Use $push to insert the new element into the array
            { new: true } // Option to return the updated document
        );
    res.json({success:true,
    doctoradd:doctor_exist.patientadd});
    }
    catch(err){
        res.json({
            success:false,
            msg:"error"
        })
    }
})

module.exports=router;