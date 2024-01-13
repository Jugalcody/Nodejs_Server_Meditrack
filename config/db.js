const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try{
    const conn=await mongoose.connect(`mongodb+srv://Jugalcody:Jugal2002@cluster0.gb1fb8m.mongodb.net/patient`);
    console.log(`MongoDB Connected:${mongoose.connection.host}`.cyan.bold);
    }
    catch(err){
    }

}

module.exports=connectDB;
