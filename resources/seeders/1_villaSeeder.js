'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('villas', [
      {
        villa_id: 1,
        villa_owner_id: 4,
        villa_name: 'Ocean Villa',
        villa_description: 'lorem ipsum',
        villa_address: 'Jl. nangka',
        villa_bed_capacity: 2,
        villa_price: 2000000,
        villa_price_fee: 200000
      }
    ])
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('villas', null, {})
  }
}
