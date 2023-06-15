import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Book from './model/Book.js';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
  })
);

mongoose.connect('mongodb+srv://jloman200:jloman200@cluster0.cpsbbed.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Get all books
app.get('/books', async(req, res) => {
   const books = await Book.find()
    try {
        res.send(books);
        } catch (error) {
        res.status(500).send(error);
        }
});
      
// Get a book by id
app.get('/books/:id', async(req, res) => {
    const id = req.params.id;
   const book = await Book.findById(id);
    try {
        res.send(book);
        } catch (error) {
            res.status(500).send(error);
        }
});

// Add a new book
app.post('/books',async(req, res) => {
    const{ author, title, cost, image } = req.body;
    const book = new Book({ author, title, cost, image });
    try {
        const result = await book.save();
        res.send(result);
      } catch (error) {
        res.send(error);
      }
}
);
  app.listen(3000, () => console.log(`Book service listening on port ${3000}`));