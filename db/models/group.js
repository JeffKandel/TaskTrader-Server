'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('groups', {
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: STRING,
    icon: STRING
  });

module.exports.associations = (Group, { User, Task, UserGroup }) => {
  Group.belongsToMany(User, { through: UserGroup });
  Group.hasMany(Task);
};
