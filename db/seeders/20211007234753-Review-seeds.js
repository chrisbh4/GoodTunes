'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
     {comment: 'This is a great Album', rating: 9, albumId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {comment: 'Absolutely incredible! This album changed my life. Every track is a masterpiece.', rating: 10, albumId: 3, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //  {comment: 'Good vibes throughout, but a few tracks feel repetitive. Still enjoyable.', rating: 7, albumId: 8, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //  {comment: 'Not my cup of tea. Too experimental for my taste, lacks catchy melodies.', rating: 4, albumId: 34, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //  {comment: 'Classic album that never gets old. The production quality is timeless.', rating: 9, albumId: 15, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //  {comment: 'Solid effort with some standout tracks, but inconsistent overall quality.', rating: 6, albumId: 21, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //  {comment: 'Raw emotion and powerful lyrics. This hits different every time I listen.', rating: 8, albumId: 5, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //  {comment: 'Perfect for background music but lacks the depth I was hoping for.', rating: 5, albumId: 13, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //  {comment: 'Mind-blowing instrumentation and vocals. A true work of art from start to finish.', rating: 10, albumId: 35, userId: 1, createdAt: new Date(), updatedAt: new Date()},
    //  {comment: 'Decent album with a couple of great singles, but most tracks are forgettable.', rating: 6, albumId: 18, userId: 1, createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
