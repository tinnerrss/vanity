'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    models.category.belongsTo(models.makeup);
  };
  return category;
};