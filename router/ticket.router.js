const express = require("express");
const { authentication } = require("../middleware/auth/authentication");
const {
  createTicket,
  getTicket,
  removeTicket,
  getTicketDetail,
} = require("../controller/ticket.controller");
const ticketRouter = express.Router();
ticketRouter.post("/create", authentication, createTicket);
ticketRouter.get("/getTicket", authentication, getTicket);
ticketRouter.delete("/remove/:id", authentication, removeTicket);
ticketRouter.get("/getTicket/:id", authentication, getTicketDetail);

module.exports = {
  ticketRouter,
};
