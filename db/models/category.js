'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('categories', {
    name: STRING
  });

module.exports.associations = (Category, { Task }) => {
  Category.belongsToMany(Task, { through: 'TaskCategory' });
};
