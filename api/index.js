const express = require("express");
const morgan = require("morgan");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
