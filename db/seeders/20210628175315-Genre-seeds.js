'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Genres', [
     { name: "Hip-Hop", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "R&B", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "Alternative/Indie", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "Country", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "Classic Rock", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "Jazz", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "Pop", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "Electronic", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "Rock", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "Reggae", createdAt: new Date(), updatedAt: new Date() },
    //  { name: "Rap", createdAt: new Date(), updatedAt: new Date() }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Genres', null, {});
  }
};
