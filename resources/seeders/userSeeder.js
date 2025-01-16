'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        user_name: 'superadmin',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'SuperAdmin'
      },
      {
        user_id: 2,
        user_name: 'admin',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'Admin'
      },
      {
        user_id: 3,
        user_name: 'finance',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'Finance'
      },
      {
        user_id: 4,
        user_name: 'owner',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'Owner'
      },
      {
        user_id: 5,
        user_name: 'agency',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'Agency'
      },
      {
        user_id: 6,
        user_name: 'Marketing',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a',
        user_role: 'Marketing'
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
