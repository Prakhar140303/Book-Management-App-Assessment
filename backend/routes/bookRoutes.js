import express from 'express'
const router = express.Router();
import {getBooks,addBook,updateBook,deleteBook} from './../controllers/bookContollers.js'
router.get("/books",getBooks );

router.post("/books",addBook);

router.put("/books",updateBook );

router.delete("/books/:id",deleteBook);

export default router;