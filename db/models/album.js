'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    genreId: DataTypes.INTEGER,
    ownerCount: DataTypes.INTEGER,
    releaseDate: DataTypes.INTEGER,
    imgSrc: DataTypes.TEXT
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};
