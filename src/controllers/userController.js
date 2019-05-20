const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
const stripe = require("stripe")("sk_test_XzNhcvpmxZrrSy60kDBffmbu00xKGO8oSq");

module.exports = {
  signUp(req, res, next) {
    res.render("users/signup");
  },

  create(req, res, next) {
    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };

    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
      }
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "natalie.thomas.nmt@gmail.com",
      from: "natalie.thomas.nmt@gmail.com",
      subject: "Welcome to Blocipedia!",
      text: "Thank you for creating an account with us.",
      html: "<strong>Thank you for creating an account with us.</strong> We can't wait to see what you do next.",
    };

    sgMail.send(msg);
  },

  signInForm(req, res, next) {
    res.render("users/sign_in");
  },

  signIn(req, res, next) {
    passport.authenticate("local")(req, res, function () {
      if (!req.user) {
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    })
  },

  signOut(req, res, next) {
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },

  show(req, res, next) {

    userQueries.getUser(req.params.id, (err, result) => {

      if (err || result.user === undefined) {
        req.flash("notice", "No user found with that ID.");
        res.redirect("/");
      } else {

        res.render("users/show", { ...result });
      }
    });
  },

  upgrade(req, res, next) {
    res.render("users/upgrade");
  },

  purchaseUpgrade(req, res, next) {
    // const stripe = require("stripe")("sk_test_XzNhcvpmxZrrSy60kDBffmbu00xKGO8oSq");
    // const token = req.body.stripeToken;
    // const charge = stripe.charges.create({
    //   amount: 1500,
    //   currency: 'usd',
    //   source: token,
    //   statement_descriptor: 'Blocipedia Pro Account',
    //   capture: false,
    //   receipt_email: 'natalie.thomas.nmt@gmail.com',
    // })
    userQueries.upgradeUser(req.params.id, (err, user) => {
if (err){
  console.log(err);
}
      // if (err && err.type === "StripeCardError") {
      //   req.flash("notice", "Your payment was unsuccessful");
      //   res.redirect("/users/upgrade");
      // } else {
      //   req.flash("notice", "Your payment was successful. You've been upgraded to a Pro account!");
      //   res.redirect(`/`);

      // }
    })
  }
};