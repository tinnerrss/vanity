'use strict';
module.exports = (sequelize, DataTypes) => {
  const makeup = sequelize.define('makeup', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image_link: DataTypes.STRING,
    product_link: DataTypes.STRING,
    description: DataTypes.TEXT,
    product_type: DataTypes.STRING,
  }, {});
  makeup.associate = function(models) {
    models.makeup.hasMany(models.category);
    models.makeup.hasMany(models.comment);
    models.makeup.hasMany(models.taglist);
    models.makeup.belongsToMany(models.user, { through: models.usersMakeups });
  };
  return makeup;
};