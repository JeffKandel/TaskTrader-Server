'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('tasks', {
    description: STRING,
    categories: STRING,
    creator: STRING,
    assignee: STRING
  });

module.exports.associations = (Bounty, { Task, BountyTask }) => {
  Task.belongsToMany(Bounty, { through: BountyTask });
};
