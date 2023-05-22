import mongoose from "mongoose";

const Connection = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL , {useUnifiedTopology:true , useNewUrlParser: true});
        console.log("Databse Connected");
    } catch (error) {
        console.log("Error : " , error.message);
    }
}

export default Connection;