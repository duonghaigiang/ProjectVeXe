const express = require("express");
const fs = require("fs");
const { authentication } = require("../middleware/auth/authentication");
const { author } = require("../middleware/auth/authorize");

const path = require("path");
const postsRouter = express.Router();
const readData = () => {
  try {
    const filePath = path.join(__dirname, "..", "public", "posts.json");
    const readFd = JSON.parse(fs.readFileSync(filePath).toString());
    return readFd;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const writeDate = (list) => {
  try {
    const filePath = path.join(__dirname, "..", "public", "posts.json");

    fs.writeFileSync(filePath, JSON.stringify(list));
  } catch (error) {
    return null;
  }
};
const readFs = (req, res) => {
  const posts = readData();
  if (posts) {
    res.send(posts);
  } else {
    res.send("lỗi khi đọc file");
  }
};

const update = (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const posts = readData();
    if (posts) {
      const post = posts.find((item) => item.id == id);
      if (post) {
        Object.assign(post, data);
        writeDate(posts);
        res.send("Đổi thành công");
      }
    } else {
      res.send("khong tim duoc item");
    }
  } catch (error) {
    res.send("khong lay duoc id");
  }
};
postsRouter.get("/get", readFs);
postsRouter.put("/put/:id", authentication, author, update);

module.exports = { postsRouter };
