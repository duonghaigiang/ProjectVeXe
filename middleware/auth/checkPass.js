const { User } = require("../../models");
const bcryptjs = require("bcryptjs");
const checkPass = async (req, res, next) => {
  try {
    const { password } = req.body;
    const curentUser = req.user;
    const user = await User.findOne({
      where: {
        email: curentUser.email,
      },
    });
    const checkPassword = bcryptjs.compareSync(password, user.password);
    if (checkPassword) {
      next();
    } else {
      res.send("Mật khẩu của bạn không đúng");
    }
  } catch (error) {
    res.send("Không lấy được dữ liệu");
  }
};
module.exports = { checkPass };
