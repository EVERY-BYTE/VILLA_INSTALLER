'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('extra_beds', {
      ...ZygoteModel,
      extra_bed_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      extra_bed_booking_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'bookings',
          key: 'booking_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      extra_bed_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      extra_bed_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('extra_beds')
  }
}
