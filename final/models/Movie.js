const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [2, "Movie title length is too short"],
      maxLength: [100, "Movie title length is too long"],
      trim: true,
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Date,
    },
  },
  { timestamps: true }
);

movieSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Movie", movieSchema);
