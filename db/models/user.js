'use strict';

const { STRING, VIRTUAL, BOOLEAN } = require('sequelize');

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

module.exports.associations = (User, { Bounty }) => {
  User.hasMany(Bounty);
};
