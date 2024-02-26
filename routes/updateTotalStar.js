const express=require('express');
const router=express.Router();
const Doctor=require('../models/Doctor');
const { Db } = require('mongodb');

router.put('/addStar/:phone',async (req,res,next)=>{

    
    try{
        const phone = req.params.phone; 
        let doctor=await Doctor.findOneAndUpdate({phone:phone},
       {$set:{totalStar:change(Number(req.body.star),Number(req.body.oldstar),Number(req.body.reviewlength)+1)   
        }},{new:true});

        res.json({success:true,
        star:doctor.totalStar});
             

    }
    catch(err){
        res.json({
            success:false,
            msg:"error"
        })
    }
})

function change(newstar,oldstar,total_reacted){

    let avgstar=((oldstar+newstar)/((total_reacted)*5))*5;

    return avgstar;
} 
module.exports=router;