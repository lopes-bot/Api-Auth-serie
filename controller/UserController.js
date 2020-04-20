const User = require("../models/User");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");

signToken = (user) => {
  return JWT.sign(
    {
      iss: "CodeWorkr",
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    //console.log("contents of  req.value.body", req.value.body);
    //console.log("UserControle.signUp() called!");
    const { email, password } = req.value.body;
    //verifica se ja possue um usuario com esse email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res
        .status(403)
        .json({ erro: "ja existe um usuario com esse email" });
    }

    //criando um novo usuario
    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: password,
      },
    });

    await newUser.save();

    //resposta do token
    //res.json({ User: "Usuario criado" });

    const token = signToken(newUser); // gerador de token

    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    //console.log("user", req.user);

    const token = signToken(req.user);
    //console.log("token " + token);
    res.status(200).json({ token });
    //console.log("login realizado com sucesso");
  },

  secret: async (req, res, next) => {
    console.log("UserControle.secret() called!");
    res.json({ secret: "resource" });
  },

  googleoAuth: async (req, res, next) => {
    //gerador de token
    console.log("req.user", req.user);
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
};
