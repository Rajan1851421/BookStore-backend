import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  title: String,  // Corrected field name
}, {
  timestamps: true  // Corrected option for timestamps
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
