import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

const app = express();
app.use(express.json());

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


// Route for saving a book
app.post('/api/book', async(req, res)=>{
    try {

        // Validation
        if ( !req.body.title || !req.body.author || !req.body.publishYear )
        {
            return res.status(400).send({
                message: "Send all the required fields: title, author, publishYear"
            });
        }

        //Creating a new document
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        //Saving it in our NoSQL
        const book = await Book.create(newBook);

        //Return the status to show while fetching api
        return res.status(201).send(book);


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route to get all the books
app.get('/api/book', async(req, res)=>{
    try {
        const books = await Book.find();
        return res.status(201).send({
            count: books.length,
            data: books
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
})

//Route to get single book
app.get('/api/book/:id', async(req, res)=>{
    try {
        
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).send(book);

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
})

app.listen(PORT, ()=> {
    console.log(`App is listening on port: ${ PORT }`);
})