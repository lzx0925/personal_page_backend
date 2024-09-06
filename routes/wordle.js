const express = require("express");
const { check_word } = require("../controllers/wordle");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.post("/check_word", upload.none(), check_word);

// router.post("/save_wordle", readFiles);

module.exports = router;
