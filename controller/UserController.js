module.exports = {
  signUp: async (req, res, next) => {
    console.log("contents of  req.value.body", req.value.body);
    console.log("UserControle.signUp() called!");
  },
  signIn: async (req, res, next) => {
    console.log("UserControle.signIn() called!");
  },
  secret: async (req, res, next) => {
    console.log("UserControle.secret() called!");
  },
};
