import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

try {
    const connection = await mongoose.connect(mongoDBURL);
    if (connection){
        console.log("MongoDB is connected");
    }
} catch (error) {
    console.log("MongoDB not connected: ",error);
}

app.get("/", (req, res)=> {
    console.log(req);
    return res.status(234).send("Welcome to the MERN stack tutorial")
});

app.listen(PORT, ()=> {
    console.log(`App is listening on port: ${ PORT }`);
})