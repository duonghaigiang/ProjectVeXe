const multer = require("multer");
const mkdirp = require("mkdirp");
const uploadImg = (type) => {
  try {
    const mkdir = mkdirp.sync(`./public/image/${type}`);

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `./public/image/${type}`); // setup chỗ cần lưu
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname); // đặt lại tên cho fisle
      },
    });
    const upload = multer({
      storage: storage,
      fileFilter: function (req, file, cb) {
        const extentionIMG = [".png", ".jpg", ".webp"];
        const extention = file.originalname.slice(-4);
        const check = extentionIMG.includes(extention);
        if (check) {
          cb(null, true);
        } else {
          cb(new Error("không tồn tại"));
        }
      },
    });

    return upload.single(type);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { uploadImg };
