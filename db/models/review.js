'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    comment: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate:{
        min:0,
        max:10
      }
    },
    albumId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};
