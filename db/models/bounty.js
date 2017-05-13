'use strict';

const { INTEGER } = require('sequelize');

module.exports = db =>
  db.define('bounties', {
    amount: {
      type: INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    }
  });

module.exports.associations = (Bounty, { Task, BountyTask, User }) => {
  Bounty.belongsToMany(Task, { through: BountyTask });
  Bounty.belongsTo(User)
};
