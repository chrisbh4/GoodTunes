'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Shelf, {foreignKey: 'userId'})
    User.belongsToMany(models.Album, {
      through: 'Review',
      foreignKey: 'userId',
      otherKey: 'albumId'
    })
  };
  return User;
};
