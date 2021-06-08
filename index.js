const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200,
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
}))

app.use(routes);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
