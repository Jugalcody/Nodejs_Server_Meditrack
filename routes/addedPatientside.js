const express=require('express');
const router=express.Router();
const Patient=require('../models/Patient');
const { Db } = require('mongodb');

router.put('/addDoctor/:phone',async (req,res,next)=>{

    
    try{
        const phone = req.params.phone; // Access phone from params
        const doctoradd = req.body;
        let patient_exist = await Patient.findOneAndUpdate(
            { phone: phone },
            { $push: { doctoradd: doctoradd } }, // Use $push to insert the new element into the array
            { new: true } // Option to return the updated document
        );
    res.json({success:true,
    doctoradd:patient_exist.doctoradd});
    }
    catch(err){
        res.json({
            success:false,
            msg:"error"
        })
    }
})

module.exports=router;