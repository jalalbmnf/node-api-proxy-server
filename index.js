const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// RATE LIMIT

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 MINS
  max: 100,
});

app.use(limiter);
app.set("trust proxy", 1);

// ENABLE CORS
app.use(cors());

// set static folder
app.use(express.static("public"));

// ROUTES
app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
