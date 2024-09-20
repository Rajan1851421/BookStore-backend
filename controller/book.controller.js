import Book from "../model/book.model.js";
import https from 'https';

// Create an HTTPS agent if needed for external HTTPS calls
const agent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL certificate verification
});

// Get all books
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

// Search for a book by its ID
export const searchBook = async (req, res) => {
  const { id } = req.params; // Extract book ID from request parameters
  try {
    // Use findById to search for the book by its ID
    const cartBook = await Book.findById(id);

    // Check if the book was found
    if (!cartBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // If book is found, send the book data as a response
    res.status(200).json(cartBook);
  } catch (error) {
    // Send error message in case of failure
    res.status(500).json({
      error: error.message,
    });
  }
};

// Create a new book
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

// Delete a book by its ID
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    // Use findByIdAndDelete to delete the book by its ID
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found!" });
    }
    res.status(200).json({ message: "Book deleted successfully!", book: deletedBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
