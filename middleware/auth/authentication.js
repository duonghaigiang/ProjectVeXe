const jwt = require("jsonwebtoken");
const { User } = require("../../models/index");
const authentication = (req, res, next) => {
  try {
    const token = req.header("token");
    const userDecode = jwt.verify(token, "admin-090101");
    if (userDecode) {
      req.user = userDecode;
      next();
    } else {
      res.status(404).send("ban chua dang nhappp");
    }
  } catch (error) {
    res.status(404).send("không lấy được token", error);
  }
};

const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      res.send("user existed !!");
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { authentication, checkUser };
