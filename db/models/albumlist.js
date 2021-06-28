'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumList = sequelize.define('AlbumList', {
    shelfId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    listenedTo: DataTypes.BOOLEAN
  }, {});
  AlbumList.associate = function(models) {
    // associations can be defined here
  };
  return AlbumList;
};
