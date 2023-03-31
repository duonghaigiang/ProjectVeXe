const { User } = require("../../models");
const author = async (req, res, next) => {
  try {
    const { user } = req;
    if (
      ["admin"].findIndex((item) => {
        return item === user.type;
      }) !== -1
    ) {
      next();
    } else {
      res.status(500).send("error");
    }
  } catch (error) {
    res.status(500).send("error", error);
  }
};
module.exports = { author };
