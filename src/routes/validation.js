module.exports = {
  validateWikis(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("title", "must be at least 2 characters in length").isLength({min: 2});
      req.checkBody("body", "must be at least 4 characters in length").isLength({min: 4});
    }
    const errors = req.validationErrors();
    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
},
    validateUsers(req, res, next) {
      console.log("Debugging: validateUsers")
      if(req.method === "POST") {
        console.log("Debugging: after post in validateUsers ", JSON.stringify(req.body));
        req.checkBody("email", "must be valid").isEmail();
        req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
        req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
      }
 
      const errors = req.validationErrors();
 
      if (errors) {
        req.flash("error", errors);
        return res.redirect(req.headers.referer);
      } else {
        return next();
      }
    }
  }