const express=require('express');
const router=express.Router();

router.get('/getotpsms',async (req,res)=>{
  
    try{
    var otp=Math.floor(1000+Math.random()*9000);
    
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
