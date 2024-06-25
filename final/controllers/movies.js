const Movie = require("../models/Movie");
const { PaginationParameters } = require("mongoose-paginate-v2");

async function getMoviesCustom(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const movies = await Movie.find().skip(offset).limit(limit).exec();
  const totalItems = await Movie.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  return res.status(200).json({ totalItems, page, totalPages, movies });
}

function getMoviesLibrary(req, res) {
  const { page, limit } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const movies = Movie.paginate({}, options).then((result) => {
    return res.status(200).json({
      totalItems: result.totalDocs,
      page: result.page,
      totalPages: result.totalPages,
      movies: result.docs,
    });
  });

  /*
  Movie.paginate(...new PaginationParameters(req).get()).then((result) => {
    return res.status(200).json({
      totalItems: result.totalDocs,
      page: result.page,
      totalPages: result.totalPages,
      movies: result.docs,
    });
  });
*/
}

module.exports = {
  getMoviesCustom,
  getMoviesLibrary,
};
