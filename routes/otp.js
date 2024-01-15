const express=require('express');
const router=express.Router();
var sid='ACc5bc694c8f0a706090c13ae299818bbc';
//var token='00501cc79e211e158fb6a251af6c5f32';


router.post('/getotp',async (req,res)=>{
  
    const{token,phone}=req.body;
    const client=require('twilio')(sid,token);
    
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


module.exports=router;
