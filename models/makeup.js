'use strict';
module.exports = (sequelize, DataTypes) => {
  const makeup = sequelize.define('makeup', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  makeup.associate = function(models) {
    // associations can be defined here
  };
  return makeup;
};