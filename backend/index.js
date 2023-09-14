import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRouter from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middlewate for parsin request body
app.use(express.json());

//Middleware to handle CORS
// 1. first method
app.use(cors());
// 2. Allow custome origin
// app.use(cors({
//     origin: 'http://localhosr:3000',
//     methods: ['GET', 'POST', 'PUT'],
//     allowedHeaders: ['Content-Type'],
// }))

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

//Handling /books with bookRouter middleware
app.use("/api/book", booksRouter);

app.listen(PORT, ()=> {
    console.log(`App is listening on port: ${ PORT }`);
})