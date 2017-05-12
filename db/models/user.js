'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('users', {
    name: {
      type: STRING,
    },
    password: STRING,
    image: STRING,
    phoneNumber: STRING,
    email: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    }
  });

module.exports.associations = (User, { Bounty, Group, UserGroup }) => {
  User.hasMany(Bounty);
  User.belongsToMany(Group, { through: UserGroup});
};
