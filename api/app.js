const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

//Route imports
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");

//Routes
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
