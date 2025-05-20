const router = require("express").Router();
const { authenticate } = require("../middlewares/authMiddlewares");
const { createReview, updateReview, deleteReview } = require("../controllers/reviewControllers");

router.post("/:id/reviews", authenticate, createReview);
router.put("/reviews/:id", authenticate, updateReview);
router.delete("/reviews/:id", authenticate, deleteReview);

module.exports = router;
