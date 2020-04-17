const express = require("express");
const router = require("express-promise-router")();

const { validateBody, schemas } = require("../helpers/routerHelper");

const UserController = require("../controller/UserController");

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UserController.signUp);

router.route("/signin").post(UserController.signIn);

router.route("/secret").get(UserController.secret);

module.exports = router;
