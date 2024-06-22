const Movie = require("../models/Movie");
const { PaginationParameters } = require("mongoose-paginate-v2");

async function getMoviesCustom(req, res) {
  let query = Movie.find();

  const currentPage = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (currentPage - 1) * limit;

  query = query.skip(offset).limit(limit);
  const movies = await query.exec();

  const totalItems = await Movie.estimatedDocumentCount();
  const totalPages = Math.ceil(totalItems / limit);

  return res.status(200).json({ totalItems, currentPage, totalPages, movies });
}

function getMoviesLibrary(req, res) {
  const { page, limit } = req.query;

  const options = {
    page: Number(page),
    limit: Number(limit),
  };

  const movies = Movie.paginate({}, options).then((result) => {
    return res.status(200).json({
      totalItems: result.totalDocs,
      currentPage: result.page,
      totalPages: result.totalPages,
      movies: result.docs,
    });
  });

  /*
  Movie.paginate(...new PaginationParameters(req).get()).then((result) => {
    return res.status(200).json({
      totalItems: result.totalDocs,
      currentPage: result.page,
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
