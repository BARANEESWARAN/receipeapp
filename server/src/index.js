const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const path=require("path")
const connectDatabase = require("./config/database")
const { userRouter } = require("./route/Users")
const { recipeRouter } = require("./route/Recipe")
const app=express()

connectDatabase()
dotenv.config({path:path.join(__dirname,"config","config.env")})
app.use(express.json())
app.use(cors())
app.use("/auth/",userRouter)
app.use("/recipes",recipeRouter)

const server=app.listen(process.env.PORT,(err)=>{
    if(err) throw err
    else{
        console.log(`server running port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    }
})

process.on("unhandledRejection",(err)=>{

    console.log(`Error ${err.message}`)
    console.log("sutting down server due to unhadle rejection")
    server.close(()=>{
        process.exit(1)
    })
})
process.on("uncaughtException",(err)=>{

    console.log(`Error ${err.message}`)
    console.log("sutting down server due to uncaughtException")
    server.close(()=>{
        process.exit(1)
    })
})