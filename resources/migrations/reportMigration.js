'use strict'
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('report', {
      ...ZygoteModel,
      report_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      report_owner_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      report_villa_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      report_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      report_total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      report_description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      report_category: {
        type: DataTypes.ENUM('income', 'spend'),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('report')
  }
}
