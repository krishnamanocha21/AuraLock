import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import listEndpoints from 'express-list-endpoints';
const app=express();

//app.use() is used for middleware in express.js and configures it
app.use(cors({
    //origin: process.env.CORS_ORIGIN,
    origin: [ "http://localhost:5174"],
    credentials: true,
    
}
));


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true ,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//route import 
import userRouter from './routes/user.routes.js'
import fileRouter from './routes/file.routes.js'

// 2. Declare Routes (proxy used in the frontend)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/files", fileRouter)


console.log("Registered Routes:");
console.table(listEndpoints(app));

export default app;

//app.js acts as the central switchboard. It doesn't need to know how to register a user; it just needs to know who handles that job.


// app.use tells Express to apply a specific URL Prefix to a group of routes.
// In app.js (The Prefix): /api/v1/users
// In user.routes.js (The Suffix): /login
// The Final URL: http://localhost:8000/api/v1/users/login
//the localhost hiding work is done by proxy