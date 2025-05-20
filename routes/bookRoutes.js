const router = require("express").Router();
const { authenticate } = require("../middlewares/authMiddlewares");
const { createBook, getBooks, getBookDetails,searchBooks} = require("../controllers/bookControllers");

router.post("/", authenticate, createBook);
router.get("/", getBooks);
router.get("/:id", getBookDetails);
router.get("/search", searchBooks);
module.exports = router;
