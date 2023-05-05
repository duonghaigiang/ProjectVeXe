"use strict";

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
      "stations",
      [
        {
          name: "Trạm xe Hoàng Khải",
          address:
            "36B, Khu phố 1, Phường Phú Tân , Bến Tre |  395 Kinh Dương Vương - Phường An Lạc , Quận 5",
          province: "Thành Phố Hồ Chí Minh , Tiền Giang , Bến Tre",
          numberPhone: "0533658512",
          price: "90000",
          description:
            "Hãng xe Hoàng Khải hỗ trợ loại xe ghế ngồi 28 chỗ. Số lượng ghế giới hạn nhưng vẫn đảm bảo chất lượng dịch vụ cao nên nếu đặt quá gần ngày đi sẽ không còn những vị trí tốt hoặc hết vé.",
          email: "test1@gmail.com",
          createdAt: "2023-03-22",
          updatedAt: "2023-03-22",
        },
        {
          name: "Trạm xe Điền Linh Limousine",
          address:
            "36B, Khu phố 1, Phường Phú Tân , Đà Lạt |  395 Kinh Dương Vương - Phường An Lạc , Quận 4",
          province: "Thành Phố Hồ Chí Minh , Đà Lạt ",
          numberPhone: "0533658512",
          price: "90000",
          email: "test2@gmail.com",
          description:
            "Hãng xe Hoàng Khải hỗ trợ loại xe ghế ngồi 28 chỗ. Số lượng ghế giới hạn nhưng vẫn đảm bảo chất lượng dịch vụ cao nên nếu đặt quá gần ngày đi sẽ không còn những vị trí tốt hoặc hết vé.",
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
