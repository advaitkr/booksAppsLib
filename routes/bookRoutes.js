const router = require("express").Router();
const { authenticate } = require("../middlewares/authMiddlewares");
const { createBook, getBooks, getBookDetails } = require("../controllers/bookControllers");

router.post("/", authenticate, createBook);
router.get("/", getBooks);
router.get("/:id", getBookDetails);

module.exports = router;
