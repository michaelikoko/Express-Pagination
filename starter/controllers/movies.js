const Movie = require("../models/Movie");

async function getMoviesCustom(req, res) {
    res.status(200).send("Basic Express Pagination")
}

function getMoviesLibrary(req, res) {
    res.status(200).send("Express Pagination using mongoose-paginate-v2")
}

module.exports = {
  getMoviesCustom,
  getMoviesLibrary,
};
