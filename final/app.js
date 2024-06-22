require("express-async-errors");
const express = require("express");
const app = express();
const config = require("./utils/config");

const mongoose = require("mongoose");
const morgan = require("morgan");
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const moviesRouter = require("./routes/movies");

//middlewares
app.use(morgan("common"));

//routes
app.use("/api/v1/movies", moviesRouter);

//error middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = config.PORT || 5001;
async function start() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

start();
