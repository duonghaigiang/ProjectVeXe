const express = require("express");
const {
  checkUser,
  authentication,
} = require("../middleware/auth/authentication");
const { author } = require("../middleware/auth/authorize");
const {
  register,
  getListUser,
  login,
  delecteUser,
  getDetail,
  curentUser,
  changePassword,
  uploadAvarta,
} = require("../controller/user.controllers");
const { uploadImg } = require("../middleware/postImg.middleware");
const userRouter = express.Router();
userRouter.post("/register", checkUser, register);
userRouter.get("/register", authentication, author, getListUser);
userRouter.post("/login", login);
userRouter.get("/register/:id", authentication, author, getDetail);
userRouter.delete("/register/:id", delecteUser);
userRouter.get("/user", authentication, curentUser);
userRouter.put("/user", authentication, changePassword);

userRouter.post(
  "/upload_img",
  authentication,
  uploadImg("avatar"),
  uploadAvarta
);
module.exports = { userRouter };
