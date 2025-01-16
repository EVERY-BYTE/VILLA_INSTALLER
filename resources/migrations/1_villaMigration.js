'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('villas', {
      ...ZygoteModel,
      villa_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      villa_owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      villa_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      villa_description: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      villa_address: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      villa_bed_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      villa_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      villa_price_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('villas')
  }
}
