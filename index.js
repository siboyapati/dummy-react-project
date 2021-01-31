require("dotenv").config();
let express = require("express");
const helmet = require("helmet");
const mongoose =  require("mongoose");
const https =  require("https");
const { readFileSync } =  require("fs");
const { resolve, join } =  require("path");
const passport =  require("passport");
const all_routes =  require("express-list-endpoints");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var compression = require("compression");
var cors = require("cors");
const { initDb, getDb } = require("./datatbase");
const assert = require("assert");
const routes =  require("./routes");
const { seedDb } =  require("./utils/seed");

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(cookieParser());

var allowedOrigins = [
  "http://localhost:3000",
  "https://localhost:3000",
  "https://localhost:5000",
  "http://localhost:5000",
  "http://yourapp.com",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)

      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(logger("dev"));
app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Allows use of req.body (for json)

app.use(passport.initialize());
require("./services/jwtStrategy");
require("./services/facebookStrategy");
require("./services/googleStrategy");
require("./services/localStrategy");

const isProduction = process.env.NODE_ENV === "production";
const dbConnection = isProduction
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

// Connect to Mongo
// mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

// mongoose
// .connect(process.env.MONGO_URI, {
// useUnifiedTopology: true,
// useNewUrlParser: true,
// })
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    seedDb();
  })
  .catch((err) => console.log(err));

app.use("/", routes);
app.use("/public", express.static(join(__dirname, "./public")));
app.get("/robots.txt", (req, res) =>
  res.sendFile("robots.txt", { root: __dirname })
);

if (isProduction) {
  app.use(express.static(join(__dirname, "../../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, "../..", "client", "build", "index.html")); // index is in /server/src so 2 folders up
  });
  const port = process.env.PORT || 80;
  app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
  const port = process.env.PORT || 5000;
  // main();
  main()
  const httpsOptions = {
    key: readFileSync(resolve(__dirname, "./security/server-key.pem")),
    cert: readFileSync(resolve(__dirname, "./security/server-cert.pem")),
  };
  const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log("https server running at " + port);
  });
}

async function main() {
  await initDb();
  // const collection = getDb().db("etf_db").collection("ARKG");
  // await collection;
  // collection.find({}).toArray(function (err, docs) {
  //   assert.equal(err, null);
  //   console.log("Found the following records");
  //   console.log(docs);
  // });
}


