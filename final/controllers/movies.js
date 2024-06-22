const Movie = require("../models/Movie");
const { PaginationParameters } = require("mongoose-paginate-v2");

async function getMoviesCustom(req, res) {
  let query = Movie.find();

  const currentPage = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
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
    page: parseInt(page, 10), 
    limit: parseInt(limit, 10),
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
