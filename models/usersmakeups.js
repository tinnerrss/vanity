'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersMakeups = sequelize.define('usersMakeups', {
    userId: DataTypes.INTEGER,
    makeupId: DataTypes.INTEGER
  }, {});
  usersMakeups.associate = function(models) {
    // associations can be defined here
  };
  return usersMakeups;
};