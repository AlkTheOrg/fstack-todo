const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => console.log("Listening at port 5000"));
