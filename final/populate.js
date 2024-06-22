require("dotenv").config();

const mongoose = require("mongoose");
const config = require("./utils/config");
const movies = require("./MOCK_DATA.json");
const Movie = require("./models/Movie");

async function populate() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    await Movie.deleteMany();
    await Movie.create(movies);
    console.log("Database populated successfully!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

populate()
