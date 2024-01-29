const mongoose=require("mongoose")

const connectDatabase=async()=>{

    try{
        const responce=await mongoose.connect("mongodb://127.0.0.1:27017/users",{
            useNewUrlParser:true,
            useunifiedTopology:true
        })

        console.log("databse conncted")
        console.log(`mongoDb is connected to the host ${responce.connection.host}`) 

    }

    catch(err){
        console.log("Error"+ err)
    }




}


module.exports=connectDatabase;