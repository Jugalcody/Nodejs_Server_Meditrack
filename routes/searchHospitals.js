const express=require('express');
const router=express.Router();
const Doctor=require('../models/Doctor');
const { Db } = require('mongodb');

router.post('/searchHospitals',async (req,res,next)=>{

    var name="",type="",state="",city="",hospital_clinic="",totalStar="";
    if(req.body.name) name=req.body.name;
    if(req.body.type) type=req.body.type;
    if(req.body.hospital_clinic) hospital_clinic=req.body.hospital_clinic;
    if(req.body.state) state=req.body.state;
    if(req.body.city) city=req.body.city;
    if(req.body.totalStar) totalStar=req.body.totalStar;
    let hospital_exist;
    try{
    if(totalStar===""){
        hospital_exist=await Doctor.find({ 'clinic_hospital.hospital_clinic':{ $eq:hospital_clinic },'clinic_hospital.name':{ $regex:".*"+name+".*",$options:'i' },'clinic_hospital.type':{ $regex:".*"+type+".*",$options:'i' },'clinic_hospital.state':{ $regex:".*"+state+".*",$options:'i' },'clinic_hospital.city':{ $regex:".*"+city+".*",$options:'i' }});
    }
    else{
         hospital_exist=await Doctor.find({ 'clinic_hospital.hospital_clinic':{ $eq:hospital_clinic },'clinic_hospital.totalStar':{ $eq:totalStar },'clinic_hospital.name':{ $regex:".*"+name+".*",$options:'i' },'clinic_hospital.type':{ $regex:".*"+type+".*",$options:'i' },'clinic_hospital.state':{ $regex:".*"+state+".*",$options:'i' },'clinic_hospital.city':{ $regex:".*"+city+".*",$options:'i' }});
    }
            if(hospital_exist.length>0){
    res.json({
success:true,
data:hospital_exist.map(Doctor => Doctor.clinic_hospital)
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