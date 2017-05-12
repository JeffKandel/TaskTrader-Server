'use strict';

const { INTEGER } = require('sequelize');

module.exports = db =>
  db.define('bounties', {
    amount: {
      type: INTEGER,
      validate: {
        min: 1,
        max: 100
      }
    }
  });

module.exports.associations = (Bounty, { Task, BountyTask }) => {
  Bounty.belongsToMany(Task, { through: BountyTask });
};
