const express = require("express");
const router = express.Router();

const { getMoviesCustom, getMoviesLibrary } = require("../controllers/movies");

router.route("/custom").get(getMoviesCustom);
router.route("/library").get(getMoviesLibrary);

module.exports = router;
