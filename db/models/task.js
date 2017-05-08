'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('tasks', {
    description: STRING,
    categories: STRING
  });

module.exports.associations = (Bounty, { User, Task, BountyTask, Category, TaskCategory }) => {
  Task.belongsToMany(Bounty, { through: BountyTask });
  Task.belongsToMany(Category, { through: TaskCategory });
  Task.belongsTo(User, { as: 'creator' });
  Task.belongsTo(User, { as: 'assignee' });
};
