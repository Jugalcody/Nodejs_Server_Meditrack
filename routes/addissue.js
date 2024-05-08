const express=require('express');
const router=express.Router();
const User=require('../models/Prescription');
const { Db } = require('mongodb');


router.post('/addissue',async (req,res,next)=>{

    const {idno,sign,issueTitle}=req.body;
    const currentDate = new Date();
    const day = ('0' + currentDate.getDate()).slice(-2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const year = currentDate.getFullYear();
    const hour = ('0' + currentDate.getHours()).slice(-2);
    const minute = ('0' + currentDate.getMinutes()).slice(-2);
    const sec = ('0' + currentDate.getSeconds()).slice(-2);
    const issueid = `${day}${month}${year}@${hour}${minute}${sec}`;
    const date = `${day}/${month}/${year}`;
    const time=`${hour}:${minute}:${sec}`
    try{
    let user_exist=await User.findOne({idno:idno});
    if(user_exist){

       user_exist.issue.push({
                date: date,
                issueid: issueid,
                issuetitle: issueTitle,
                prescription: []
            });
            await user_exist.save();
        res.json({
            success:true,
            msg:"issue added to existing user"
        });
    }
    else{
        let newUser = new User({
            idno: idno,
            sign: sign,
            issue: [{
                date:date,
                time:time,
                issueid:issueid,
                issuetitle: issueTitle,
                prescription: [] 
            }]
        });
    await newUser.save();
    res.json({
        success:true,
        msg:"issue added"
    })
    }}
    catch(err){
        console.log(err);
    }
});



module.exports=router;