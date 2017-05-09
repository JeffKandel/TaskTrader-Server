'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('tasks', {
    description: STRING,
  });

module.exports.associations = (Task, { User, Bounty, Category, TaskCategory, BountyTask }) => {
  Task.belongsToMany(Bounty, { through: BountyTask});
  Task.belongsToMany(Category, { through: TaskCategory });
  Task.belongsTo(User, { as: 'creator' });
  Task.belongsTo(User, { as: 'assignee' });
};
