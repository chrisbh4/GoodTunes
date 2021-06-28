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
    Album.belongsTo(models.Genre, {foreignKey: 'genreId'})
    Album.hasMany(models.Song, {foreignKey: 'albumId'})
    Album.belongsToMany(models.Shelf, {
      through: 'AlbumList',
      foreignKey: 'albumId',
      otherKey: 'shelfId'
    })
    Album.belongsToMany(models.User, {
      through: 'Review',
      foreignKey: 'albumId',
      otherKey: 'userId'
    })
  };
  return Album;
};
