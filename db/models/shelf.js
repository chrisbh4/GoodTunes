'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shelf = sequelize.define('Shelf', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Shelf.associate = function(models) {
    Shelf.belongsTo(models.User, {foreignKey: 'userId'})
    Shelf.belongsToMany(models.Album, {
      through: 'AlbumList',
      foreignKey: 'shelfId',
      otherKey: 'albumId'
    })
  };
  return Shelf;
};
