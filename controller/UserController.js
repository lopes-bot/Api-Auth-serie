const User = require("../models/User");

module.exports = {
  signUp: async (req, res, next) => {
    //console.log("contents of  req.value.body", req.value.body);
    //console.log("UserControle.signUp() called!");
    const { email, password } = req.value.body;
    //verifica se ja possue um usuario com esse email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res
        .status(403)
        .json({ erro: "ja existe um usuario com esse email" });
    }

    //criando um novo usuario
    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    //resposta do token
    res.json({ User: "Usuario criado" });
  },
  signIn: async (req, res, next) => {
    console.log("UserControle.signIn() called!");
  },
  secret: async (req, res, next) => {
    console.log("UserControle.secret() called!");
  },
};
