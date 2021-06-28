'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    trackNum: DataTypes.INTEGER,
    title: DataTypes.STRING,
    albumId: DataTypes.INTEGER
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.Album, {foreignKey: 'albumId'})
  };
  return Song;
};
