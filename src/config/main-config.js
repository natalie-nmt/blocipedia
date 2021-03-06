require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const passportConfig = require("./passport-config");
const flash = require("express-flash");
const logger = require('morgan');

console.log("Debugging in main-config: ", process.env.DATABASE_URL);
console.log("Debugging in main-config (part 2): ", process.env.NODE_ENV);

module.exports = {
  init(app, express) {
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(expressValidator());
    app.use(session({
      secret: "test secret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 }
    }));
    app.use(flash());
    passportConfig.init(app);

    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    })

    app.use(logger('dev'));
  }
};