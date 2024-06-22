const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
 // mongoose schema for the Movie model
);

module.exports = mongoose.model("Movie", movieSchema);
