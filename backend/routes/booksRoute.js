import express from 'express'
import { Book } from '../models/bookModels.js'
import mongoose from 'mongoose';

const router = express.Router();

// Route for saving a book
router.post('/', async(req, res)=>{
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
router.get('/', async(req, res)=>{
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
router.get('/:id', async(req, res)=>{
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

//Route for updating a book
router.put('/:id', async(req, res)=>{
    try {
        // Validation
        if ( !req.body.title || !req.body.author || !req.body.publishYear )
        {
            return res.status(400).send({
                message: "Send all the required fields: title, author, publishYear"
            });
        }

        //Getting the id of book
        const { id } = req.params;

        //Getting the book document and updating it
        const result = await Book.findByIdAndUpdate(id, req.body);
        
        // Check if results exist
        if (!result){
            return res.status(404).json({
                message: 'Book not found'
            })
        }

        return res.status(200).send({
            message: 'Book updated successfully'
        });
        

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
})

//Deleting a book with id
router.delete('/:id', async(req, res)=>{
    try {

        //Getting the id of book
        const { id } = req.params;

        //Getting the book document and updating it
        const result = await Book.findByIdAndDelete(id);
        
        // Check if results exist
        if (!result){
            return res.status(404).json({
                message: 'Book not found'
            })
        }

        return res.status(200).send({
            message: 'Book deleted successfully'
        });
        

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
})

export default router;
