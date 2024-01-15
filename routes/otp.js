const express=require('express');
const router=express.Router();
var sid='ACc5bc694c8f0a706090c13ae299818bbc';
var token='5d0f066df0f706610fa7dba2cf7af715';
const client=require('twilio')(sid,token);

router.post('/getotp',async (req,res)=>{
  
    const{phone}=req.body;
    
    try{
    var otp=Math.floor(1000+Math.random()*9000);
    client .messages.create({
        body:`Hello user, Your TrackHealth otp is ${otp}`,
        from:"+13174947289",
        to:phone
    });
  res.json({
    success:true,
    otp:otp
  });  

}catch(err){
    res.json({
        success:false
    })
}
}
);


router.post('/getPassword',async (req,res)=>{
   
    
    try{


}
    catch(err){
        res.json({
            success:false,
            msg:"failed"
        })
    }
})
module.exports=router;