const express=require('express');
const router=express.Router();
const Doctor=require('../models/Doctor');
const { Db } = require('mongodb');

router.put('/review/:phone',async (req,res,next)=>{

    
    try{
        const phone = req.params.phone; 
        const reviews = req.body;
        let doctor_exist = await Doctor.findOneAndUpdate(
            { phone: phone },
            { $addToSet: { reviews:reviews}},
            {new:true});
             
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