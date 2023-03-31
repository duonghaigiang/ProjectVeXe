"use strict";
const bcryptjs = require("bcryptjs");

const password = "123456";
const salt = bcryptjs.genSaltSync(5);
const hashPassword = bcryptjs.hashSync(password, salt);
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Admin",
          email: "admin09010@gmail.com",
          password: hashPassword,
          numberPhone: "0522328536",
          type: "admin",
          createdAt: "2023-03-22",
          updatedAt: "2023-03-22",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
