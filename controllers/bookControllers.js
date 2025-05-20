const Book = require("../models/Book");
const Review = require("../models/Review");

exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (author) filter.author = author;
  if (genre) filter.genre = genre;

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(books);
};

exports.getBookDetails = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviews = await Review.find({ book: book._id });
  const averageRating = reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) : null;

  res.json({ book, averageRating, totalReviews: reviews.length });
};
exports.searchBooks = async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
  
      const regex = new RegExp(query, "i"); // case-insensitive
      const books = await Book.find({
        $or: [
          { title: { $regex: regex } },
          { author: { $regex: regex } },
        ],
      });
  
      res.status(200).json({ count: books.length, books });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  