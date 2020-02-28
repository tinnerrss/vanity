'use strict';
module.exports = (sequelize, DataTypes) => {
  const taglist = sequelize.define('taglist', {
    name: DataTypes.STRING,
    makeupId: DataTypes.INTEGER
  }, {});
  taglist.associate = function(models) {
    models.taglist.belongsTo(models.makeup);
  };
  return taglist;
};