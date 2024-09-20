import express from 'express'
import { getBook ,createBook, deleteBook,searchBook } from '../controller/book.controller.js'



const router = express.Router()

router.get('/',getBook)
router.post('/books', createBook);
router.delete('/books/:id', deleteBook)
router.get('/:id',searchBook)

export default router