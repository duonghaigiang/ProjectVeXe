const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { name, email, password, numberPhone } = req.body;
    const salt = bcryptjs.genSaltSync(5);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUsers = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      numberPhone: numberPhone,
    });
    res.status(200).send(newUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getListUser = async (req, res) => {
  try {
    const ListUser = await User.findAll();
    res.status(200).send(ListUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
const delecteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const delecte = await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("đã xóa");
  } catch (error) {
    res.status(500).send("không tìm thấy");
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const getUSer = await User.findOne({
      where: {
        email: email,
      },
    });
    if (getUSer) {
      const checkAuth = bcryptjs.compareSync(password, getUSer.password);
      if (checkAuth) {
        const token = jwt.sign(
          {
            email: getUSer.email,
            type: getUSer.type,
            name: getUSer.name,
            numberPhone: getUSer.numberPhone,
            avatar: getUSer.avatar,
          },
          "admin-090101",
          {
            expiresIn: 180 * 60, // 3h
          }
        );
        res.status(200).send({ message: "true", token: token });
      } else {
        res.status(200).send("Sai mật khẩu !");
      }
    } else {
      res.status(200).send("Email khong ton tai");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      res.status(200).send(user);
    } else res.status(500).send("khong tìm thấy tài khoản");
  } catch (error) {
    res.status(500).send(error);
  }
};
const curentUser = (req, res) => {
  try {
    const curentUser = req.user;
    if (curentUser) {
      res.status(200).send(curentUser);
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
const changePassword = async (req, res) => {
  try {
    const { password, newpassword } = req.body;
    const curentUser = req.user;
    const user = await User.findOne({
      where: {
        email: curentUser.email,
      },
    });
    const checkPassword = bcryptjs.compareSync(password, user.password);
    if (checkPassword) {
      const salt = bcryptjs.genSaltSync(5);
      const hashPassword = bcryptjs.hashSync(newpassword, salt);
      user.password = hashPassword;
      user.save();
      res.status(200).send("doi password thanh cong");
    } else {
      res.status(500).send("sai mat khau");
    }
  } catch (error) {
    res.status(500).send("sai mat khau");
  }
};
const uploadAvarta = async (req, res) => {
  // upload.single tên key
  try {
    const { file } = req;
    const { user } = req;
    if (!file) {
      res.send("file ko nhập đc");
      return null;
    }
    const url = `http://localhost:7000/${file.path}`;
    const currerntUser = await User.findOne({
      where: {
        email: user.email,
      },
    });
    currerntUser.avatar = url;
    await currerntUser.save();
    res.send("upload thành công");
  } catch (error) {
    res.send("upload thất bại");
  }
};
module.exports = {
  register,
  getListUser,
  login,
  delecteUser,
  getDetail,
  curentUser,
  changePassword,
  uploadAvarta,
};
