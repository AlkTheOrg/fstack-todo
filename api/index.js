const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(morgan("tiny"));
app.use(express.json());

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USER_PASSWORD}@cluster0.pwr0i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
});

app.get("/", (_, res) => {
  res.send("homepage");
});

app.use("/user", userRouter);
app.use((_, res) => res.status(404).send("Couldn't find this page"));

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
