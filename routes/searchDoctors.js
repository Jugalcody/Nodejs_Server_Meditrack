const express=require('express');
const router=express.Router();
const Doctor=require('../models/Doctor');
const { Db } = require('mongodb');

router.post('/searchDoctors',async (req,res,next)=>{
    var username="",speciality="",gender="",yoe="",qualification="",state="",city="";
    if(req.body.username) username=req.body.username;
    if(req.body.speciality) speciality=req.body.speciality;
    if(req.body.gender) gender=req.body.gender;
    if(req.body.yoe) yoe=req.body.yoe;
    if(req.body.qualification) qualification=req.body.qualification;
    if(req.body.state) state=req.body.state;
    if(req.body.city) city=req.body.city;

    try{

        
            let doctor_exist=await Doctor.find({ username: { $regex:".*"+username+".*",$options:'i' },speciality: { $regex:".*"+speciality+".*",$options:'i' },yoe:{ $gte:Number(yoe)},gender:{ $regex:`^${gender}`,$options:'i' },qualification:{ $regex:".*"+qualification+".*",$options:'i' },state:{ $regex:".*"+state+".*",$options:'i' },city:{ $regex:".*"+city+".*",$options:'i' }});

            if(doctor_exist.length>0){
    res.json({
success:true,
data:doctor_exist
        });
    }
        else {res.json({
            success:false
        });
    }
    }
    catch(err){
        res.json({
            success:false,
            msg:err.msg
        })
    }
})

module.exports=router;