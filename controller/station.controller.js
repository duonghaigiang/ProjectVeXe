const { response } = require("express");
const { Op } = require("sequelize");
const { Station, sequelize } = require("../models");
const createStation = async (req, res) => {
  const { name, address, province, numberPhone, email, description } = req.body;
  try {
    const newStation = await Station.create({
      name,
      address,
      province,
      numberPhone,
      email,
      description,
    });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};
// const { name } = req.query;
// if (name) {
//   const getListFillter = await Station.findAll({
//     where: {
//       name: {
//         [Op.like]: `%${name}%`,
//       },
//     },
//   });
//   res.status(200).send(getListFillter);
//   return;
const getListStation = async (req, res) => {
  try {
    const { address, province, name } = req.query;
    if (address && province) {
      const getListFilter = await Station.findAll({
        where: {
          address: {
            [Op.like]: `%${address}%`,
          },
          province: {
            [Op.like]: `%${province}%`,
          },
        },
      });
      res.status(200).send(getListFilter);
      return getListFilter;
    } else if (province) {
      const station = await Station.findAll({
        where: {
          province: {
            [Op.like]: `%${province}%`,
          },
        },
      });
      if (station) {
        res.send(station);
      } else {
        res.send("không tìm thấy");
      }
    } else if (name) {
      const getListFilter = await Station.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      res.status(200).send(getListFilter);
      return getListFilter;
    } else {
      const getList = await Station.findAll();
      res.status(200).send(getList);
      return getList;
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
const getDetailStation = async (req, res) => {
  try {
    const { id } = req.params;
    const getDetail = await Station.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(getDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // const getDetai = await Station.findOne({
    //   where: {
    //     id: id,
    //   },
    // });
    // getDetai.name = data.name;
    // getDetai.address = data.address;
    // getDetai.province = data.province;
    // await getDetai.save();
    const update = await Station.update(data, {
      where: {
        id: id,
      },
    });
    res.status(200).send("update thành công");
  } catch (error) {
    res.send("không lấy được dữ liệu");
  }
};
const removeStation = async (req, res) => {
  const { id } = req.params;
  try {
    await Station.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("Xóa trạm thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};
const getLitmit = async (req, res) => {
  const { page, pageSize } = req.body;
  // if (page) {
  // page = parseInt(page);
  // var skip = (page - 1) * pageSize;
  const [result, metadata] = await sequelize.query(
    `
  SELECT * FROM vexe.stations LIMIT ${pageSize} OFFSET  ${page}`
  );
  // }
  res.send(result);
};
const findTripStation = (req, res) => {
  const data = req.body;
};
module.exports = {
  createStation,
  getListStation,
  getDetailStation,
  updateStation,
  removeStation,
  getLitmit,
};
