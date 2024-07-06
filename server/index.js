const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const financialRecordsRouter = require("./routes/transactions");
const usersRouter = require("./routes/user");
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, X-Requested-With"
  );
  next();
});
app.use(express.json());
// MongoDB connection
const dbURI =
  "mongodb+srv://riyakochhar2001:NdSpmY5s6whGCH1A@test-demo-app.exc5quo.mongodb.net/finance-tracker-app?retryWrites=true&w=majority&appName=test-demo-app";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use("/api", financialRecordsRouter);
app.use("/auth", usersRouter);

app.listen(8000, () => {
  console.log("Listening to port 8000");
});
