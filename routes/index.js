const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express=require('express');
const router=express.Router();
const admin = require("firebase-admin");
admin.initializeApp();
// Your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jugalnerist@gmail.com', // Your Gmail email address
    pass: 'Jugal2002@'  // Your Gmail email password or an app password
  }
});

// Firebase Cloud Function to send an email
exports.sendMail=functions.firestore.document('contact/{orderId}')
.onCreate((snap, context) => {
    const mailOptions = {
        from: `jugalnerist@gmail.com`,
        to: `jugalnerist2020@gmail.com`,
        subject: 'contact form message',
        html: `<h1>Order Confirmation</h1>
         <p> <b>Email: </b>${snap.data().email} </p>`
    };
});
return transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
        console.log(error)
        return
    }
    console.log("Sent!")
});




module.exports=router;