const { User, sequelize } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
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
    res.send(newUsers);

    // const newUsers = await User.create({
    //   name: name,
    //   email: email,
    //   password: hashPassword,
    //   numberPhone: numberPhone,
    // });
    // res.status(200).send(newUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getListUser = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    if (page && pageSize) {
      const [result, metadata] = await sequelize.query(
        `
      SELECT * FROM vexe.users LIMIT ${pageSize} OFFSET  ${page}`
      );

      res.send(result);
    } else {
      const ListUser = await User.findAll();
      res.status(200).send(ListUser);
    }
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
            id: getUSer.id,
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
const ChangeInfor = async (req, res) => {
  try {
    const data = req.body;
    const { user } = req;
    const getUser = await User.findOne({
      where: {
        email: user.email,
      },
    });
    if (getUser) {
      const verify = bcryptjs.compareSync(data.passwordd, getUser.password);
      if (verify) {
        Object.assign(getUser, data); //overWrite
        await getUser.save();
        res.send("Đã cập nhật thành công");
      } else {
        res.send("Password không đúng");
      }
    } else {
      res.send("không tìm thấy email");
    }
  } catch (error) {
    res.send("Lỗi server");
  }
};
// const findUSer = async (req, res) => {
//   try {
//     const { name } = req.query;
//     const user = await User.findAll({
//       where: {
//         [Op.or]: [
//           {
//             name: {
//               [Op.like]: `%${name}%`,
//             },
//             email: {
//               [Op.like]: `%${name}%`,
//             },
//           },
//         ],
//       },
//     });
//     // const [result, metadata] = await sequelize.query(
//     //   `
//     //   SELECT * FROM vexe.users
//     //   WHERE name LIKE '%name%'
//     //   OR email LIKE '%name%';`
//     // );

//     // res.send(result);
//     if (user) {
//       res.send(user);
//     } else {
//       res.send("không tìm thấy user");
//     }
//   } catch (error) {
//     res.send("không lấy được name");
//   }
// };
const findUSer = async (req, res) => {
  try {
    const { name } = req.query;

    const [result, metadata] = await sequelize.query(
      `
      SELECT * FROM vexe.users
      WHERE name LIKE '%${name}%' OR email LIKE '%${name}%';
      `
    );

    if (result) {
      res.send(result);
    } else {
      res.send("Không tìm thấy user");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Lỗi server");
  }
};

const changeMail = async (req, res) => {
  try {
    const { password, email } = req.body;
    const curentUser = req.user;
    const user = await User.findOne({
      where: {
        email: curentUser.email,
      },
    });
    const checkPassword = bcryptjs.compareSync(password, user.password);
    if (checkPassword) {
      user.email = email;
      await user.save();
      res.send("đã đổi email thành công!");
    } else {
      res.send("Mật khẩu của bạn không đúng");
    }
  } catch (error) {
    res.send("Không lấy được dữ liệu");
  }
};

const forget = async (req, res) => {
  try {
    const { gmail } = req.body;

    const currentUser = await User.findOne({
      where: {
        email: gmail,
      },
    });
    if (currentUser) {
      // Fixed typo here
      const password = `abc123${Math.floor(Math.random() * 10000).toString()}`; // random password

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "duonghaigiang127@gmail.com",
          pass: "yrpmkmunwzaodnii", //kvuptiybvtpibreu
        },
      });

      const salt = bcryptjs.genSaltSync(5);
      const hashPassword = bcryptjs.hashSync(password, salt);
      currentUser.password = hashPassword;
      currentUser.save();
      let mailOptions = {
        from: "duonghaigiang127@gmail.com", // sender address
        to: `${gmail}`, // list of receivers
        subject: "Request Reset your password", // Subject line
        text: `${password}`,
      };
      // send mail with defined transport object
      const info = await transporter.sendMail(
        mailOptions,
        function (error, info) {
          if (error) {
            console.log("test", error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
      console.log("test", info);
      if (info) {
        res.send("ĐÃ Gửi thành công bạn kiểm tra email!");
      } else {
        res.send("Gửi thất bại");
      }
    } else {
      res.send("không tìm được email!");
    }
  } catch (error) {
    res.send("Lỗi Server");
  }
};

module.exports = {
  ChangeInfor,
  register,
  getListUser,
  login,
  delecteUser,
  getDetail,
  curentUser,
  changePassword,
  uploadAvarta,
  findUSer,
  changeMail,
  forget,
};
