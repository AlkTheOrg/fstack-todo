const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const cors = require("cors") // import cors
require("dotenv").config();

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const checkAuth = require("./middlewares/checkAuth");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(morgan("tiny"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USER_PASSWORD}@cluster0.pwr0i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
});

app.get("/", (_, res) => {
  res.send("homepage");
});

app.use("/user", checkAuth, userRouter);
app.use(authRouter);
app.use((_, res) => res.status(404).send("Couldn't find this page"));

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
