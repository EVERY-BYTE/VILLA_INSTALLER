'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      ...ZygoteModel,
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      user_password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      user_role: {
        type: DataTypes.ENUM(
          'SuperAdmin',
          'Finance',
          'Owner',
          'Admin',
          'Agency',
          'Marketing'
        ),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users')
  }
}
