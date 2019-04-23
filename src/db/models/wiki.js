'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {});
  Wiki.associate = function (models) {
    Wiki.hasMany(models.User, {
      foreignKey: "userId",
      as: "users"
    });
  };
  return Wiki;
};