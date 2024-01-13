const express=require('express');
const router=express.Router();

const User=require('../models/User');
const bcryptjs=require('bcryptjs');

router.get('/register',async(req,res,next)=>{
res.json({
"chalo bhai":"ho gya"
});
});
router.post('/register',async (req,res,next)=>{

    const {username,email,password,place}=req.body;
    try{
    let user_exist=await User.findOne({email:email});
    console.log(req.body);
    if(user_exist){
        res.json({
            success:false,
            msg:"User already exists"
        });
    }
    let user=new User();
    user.username=username;
    user.email=email;
    const salt=await bcryptjs.genSalt(10);
    user.password=await bcryptjs.hash(password,salt);
    user.place=place;
    await user.save();

    const payload={
        user:{
            id:user.id
        }
    }
    

    res.json({
        success:true,
        msg:"user registered"
    })
    }
    catch(err){
        console.log(err);
    }
})

module.exports=router;