'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('users', {
    name: STRING,
    password: STRING,
    image: STRING,
    phoneNumber: STRING,
    email: {
      type: STRING,
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
