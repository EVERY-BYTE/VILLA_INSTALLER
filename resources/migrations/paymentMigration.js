'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('payments', {
      ...ZygoteModel,
      payment_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      payment_booking_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'bookings',
          key: 'booking_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      payment_schema: {
        type: DataTypes.ENUM('downPayment', 'repayment', 'payInCash'),
        allowNull: false
      },
      payment_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      payment_method: {
        type: DataTypes.ENUM('cash', 'transfer'),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('payments')
  }
}
