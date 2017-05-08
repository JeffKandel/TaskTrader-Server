'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('tasks', {
    description: STRING,
    categories: STRING
  });

module.exports.associations = (Bounty, { User, Task, Category }) => {
  Task.hasMany(Bounty);
  // Task.belongsToMany(Category, { through: 'TaskCategory' });
  Task.belongsTo(User, { as: 'creator' });
  Task.belongsTo(User, { as: 'assignee' });
};
