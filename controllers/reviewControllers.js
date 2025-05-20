const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const review = await Review.create({
    user: req.user.id,
    book: req.params.id,
    rating,
    comment
  });
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  review.rating = req.body.rating ?? review.rating;
  review.comment = req.body.comment ?? review.comment;
  await review.save();

  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  await review.remove();
  res.json({ message: "Review deleted" });
};
