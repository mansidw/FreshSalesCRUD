var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var contactRouter = require("./routes/Contact.routes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/contact", contactRouter);
const PORT = process.env.SERVER_PORT || 8080;

app.get("/health", (req, res) => {
  return res.status(200).end("Healthy");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} GAIN`);
});
