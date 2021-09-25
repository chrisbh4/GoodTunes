'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumList = sequelize.define('AlbumList', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shelfId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    listenedTo: DataTypes.BOOLEAN
  }, {});
  AlbumList.associate = function(models) {
    // associations can be defined here
    // AlbumList.belongsTo(models.Album, {foreignKey: "albumId"})
    AlbumList.belongsTo(models.Shelf, {foreignKey: "shelfId"})
  };
  return AlbumList;
};
