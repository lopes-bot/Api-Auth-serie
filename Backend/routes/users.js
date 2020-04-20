const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routerHelper");

const UserController = require("../controller/UserController");
const passportSingIn = passport.authenticate("local", { session: false });
const passportJwt = passport.authenticate("jwt", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFacebook = passport.authenticate("facebookToken", {
  session: false,
});

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UserController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passportSingIn,
    UserController.signIn
  );

router.route("/secret").get(passportJwt, UserController.secret);

router.route("/oauth/google").post(passportGoogle, UserController.googleoAuth);
router
  .route("/oauth/facebook")
  .post(passportFacebook, UserController.facebookoAuth);

module.exports = router;
