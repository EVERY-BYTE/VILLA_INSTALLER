'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('caterings', {
      ...ZygoteModel,
      catering_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      catering_booking_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'bookings',
          key: 'booking_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      catering_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      catering_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('caterings')
  }
}
