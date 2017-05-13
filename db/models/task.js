'use strict';

const { STRING } = require('sequelize');

module.exports = db =>
  db.define('tasks', {
    description: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: STRING,
      defaultValue: 'Pending'
    }
  });

module.exports.associations = (
  Task,
  { User, Bounty, Category, TaskCategory, BountyTask }
) => {
  Task.belongsToMany(Bounty, { through: BountyTask });
  Task.belongsToMany(Category, { through: TaskCategory });
  Task.belongsTo(User, { as: 'creator' });
  Task.belongsTo(User, { as: 'assignee' });
};
