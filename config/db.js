const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try{
    const conn=await mongoose.connect(`mongodb+srv://jugalnerist:Jugal2002@cluster0.fjhosdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log(`MongoDB Connected:${mongoose.connection.host}`.cyan.bold);
    }
    catch(err){
        console.log(err);
    }

}

module.exports=connectDB;
