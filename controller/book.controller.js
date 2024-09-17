import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const { name, price, category, image, title } = req.body;

    // Create a new book using the Book model
    const newBook = new Book({
      name,
      price,
      category,
      image,
      title,
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    // Send back the newly created book
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    
    const deletedBook = await Book.findOneAndDelete(id);   
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found!" });
    }
    res.status(200).json({ message: "Book deleted successfully!", book: deletedBook });
  } catch (error) {
   
    res.status(500).json({ error: error.message });
  }
};
