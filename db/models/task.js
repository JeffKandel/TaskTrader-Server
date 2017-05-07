'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('tasks', {
    description: STRING,
    categories: STRING
  });

module.exports.associations = (Bounty, { Task, BountyTask }) => {
  Task.belongsToMany(Bounty, { through: BountyTask });
  Task.belongsTo(User, { as: 'creator' });
  Task.belongsTo(User, { as: 'assignee' });
};
