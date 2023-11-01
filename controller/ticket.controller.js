const { response } = require("express");
const { Ticket, sequelize } = require("../models/index");
const nodemailer = require("nodemailer");
const createTicket = async (req, res) => {
  try {
    const { user } = req;
    const data = req.body;
    if (data.Station_Status === "con") {
      const createTicket = await Ticket.create({
        user_id: user.id,
        trip_id: data.Station_id,
      });
      if (createTicket) {
        // Get the ticket details
        const ticketDetails = await getTicketDetail(createTicket.id);
        // Send email to the user
        //  await sendTicketEmail(user.email, ticketDetails);

        res.send("Đặt vé thành công ,hãy kiểm tra hòm thư của bạn!");
      } else {
        res.send("");
      }
    } else {
      res.send("Station ngung!");
    }
  } catch (error) {
    res.send("lấy dữ liệu thất bại");
  }
};
const getTicket = async (req, res) => {
  try {
    const { user } = req;
    const currentUser_id = user.id;
    const [result] = await sequelize.query(
      `
      SELECT vexe.tickets.id as ticket_id, vexe.stations.*, vexe.tickets.*, vexe.users.*, vexe.tickets.createdAt as ticket_CreateAt, vexe.stations.numberPhone as numberPhone_Station ,vexe.stations.name as nameStation 
      FROM vexe.stations
      INNER JOIN vexe.tickets
      ON vexe.stations.id = vexe.tickets.trip_id
      INNER JOIN vexe.users
      ON vexe.users.id = vexe.tickets.user_id
      WHERE vexe.users.id = ${currentUser_id}
      `
    );
    // }
    res.send(result);
    return result;
  } catch (error) {
    res.send("error database");
  }
};
const getTicketDetail = async (ticketId) => {
  try {
    const [result] = await sequelize.query(`
      SELECT vexe.tickets.id as ticket_id, vexe.stations.*, vexe.tickets.*, vexe.users.*, vexe.tickets.createdAt as ticket_CreateAt, vexe.stations.numberPhone as numberPhone_Station,vexe.stations.name as nameStation 
      FROM vexe.stations
      INNER JOIN vexe.tickets
      ON vexe.stations.id = vexe.tickets.trip_id
      INNER JOIN vexe.users
      ON vexe.users.id = vexe.tickets.user_id
      WHERE vexe.tickets.id = ${ticketId}
    `);

    return result;
  } catch (error) {
    throw new Error("Error retrieving ticket details");
  }
};
const sendTicketEmail = async (toUser, ticketDetails) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "duonghaigiang127@gmail.com",
        pass: "kvuptiybvtpibreu",
      },
    });
    const emailBody = `Tên Khách hàng: ${ticketDetails[0].name}
    Số Điện Khách hàng: ${ticketDetails[0].numberPhone}
    Tên Nhà Xe: ${ticketDetails[0].nameStation}, ${ticketDetails[0].description}, ${ticketDetails[0].province}
    Số điện thoại nhà xe: ${ticketDetails[0].numberPhone_Station}
    Thời Gian đặt vé: ${ticketDetails[0].ticket_CreateAt}`;
    let mailOptions = {
      from: "duonghaigiang127@gmail.com",
      to: toUser,
      subject: "Thông tin Vé Xe mà bạn vừa đặt",
      text: emailBody,
    };

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    if (info && info.response) {
      console.log("Email sent successfully:", info.response);
      return info.response;
    } else {
      console.log("Failed to send email");
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.log("Error sending email:", error);
    throw error;
  }
};

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
