'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('bookings', {
      ...ZygoteModel,
      booking_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      booking_owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      booking_agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      booking_villa_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'villas',
          key: 'villa_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      booking_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      booking_contact: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      booking_start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      booking_end_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      booking_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      booking_total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      booking_price_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('bookings')
  }
}
