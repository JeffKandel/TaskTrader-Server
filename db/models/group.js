'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('groups', {
    name: STRING,
    description: STRING,
    image: STRING
  });

module.exports.associations = (Group, { User, Task, UserGroup }) => {
  Group.belongsToMany(User, { through: UserGroup });
  Group.hasMany(Task);
};
