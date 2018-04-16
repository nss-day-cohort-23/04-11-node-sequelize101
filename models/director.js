"use strict";
module.exports = (sequelize, DataTypes) => {
  var Director = sequelize.define(
    "Director",
    {
      name: DataTypes.STRING,
      birth_year: {
        type: DataTypes.STRING,
        validate: {
          isAfter: "1950"
        }
      },
      twitter_handle: DataTypes.STRING
    },
    { tableName: "directors", timestamps: false}
  );
  Director.associate = function(models) {
    Director.hasMany(models.Show, {
      foreignKey: "directorId"
    })
  };
  return Director;
};
