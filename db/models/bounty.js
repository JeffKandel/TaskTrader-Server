'use strict';

const { INTEGER } = require('sequelize');

module.exports = db =>
  db.define('bounties', {
    amount: INTEGER
  });

module.exports.associations = (Bounty, { Task, BountyTask }) => {
  Bounty.belongsToMany(Task, { through: BountyTask });
};
