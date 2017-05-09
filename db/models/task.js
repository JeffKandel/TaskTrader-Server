'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('tasks', {
    description: STRING,
  });

module.exports.associations = (Task, { User, Bounty, Category }) => {
  Task.hasMany(Bounty);
  Task.belongsToMany(Category, { through: 'TaskCategory' });
  Task.belongsTo(User, { as: 'creator' });
  Task.belongsTo(User, { as: 'assignee' });
};
