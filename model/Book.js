import express from 'express';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSchema = new Schema({
    author:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;