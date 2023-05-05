const { response } = require("express");
const { Ticket, sequelize } = require("../models/index");
const createTicket = async (req, res) => {
  try {
    const { user } = req;
    const data = req.body;
    const createTicket = await Ticket.create({
      user_id: user.id,
      trip_id: data.Station_id,
    });
    if (createTicket) {
      res.send("Đặt vé thành công !");
    } else {
      res.send("");
    }
  } catch (error) {
    res.send("lấy dữ liệu thất bại");
  }
};
const getTicket = async (req, res) => {
  try {
    const [result, metadata] = await sequelize.query(
      `
      SELECT vexe.tickets.id as ticket_id , vexe.stations.*, vexe.tickets.*, vexe.users.*
      FROM vexe.stations
      INNER JOIN vexe.tickets
      ON vexe.stations.id = vexe.tickets.trip_id
      INNER JOIN vexe.users
      ON vexe.users.id = vexe.tickets.user_id
      `
    );
    // }
    res.send(result);
  } catch (error) {
    res.send("error database");
  }
};
const getTicketDetail = async () => {};
const removeTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findOne({
      where: {
        id: id,
      },
    });
    if (ticket) {
      await Ticket.destroy({
        where: {
          id: id,
        },
      });
      res.send("đã xóa vé");
    } else {
      res.send("không tìm được vé như vậy");
    }
  } catch (error) {
    res.send("không lấy được id");
  }
};
module.exports = {
  createTicket,
  getTicket,
  getTicketDetail,
  removeTicket,
};
