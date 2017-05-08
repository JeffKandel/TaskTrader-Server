'use strict';

const { INTEGER } = require('sequelize');

module.exports = db =>
  db.define('bounties', {
    amount: INTEGER
  });

module.exports.associations = (Bounty, { Task }) => {
  Bounty.belongsToMany(Task, { through: 'BountyTask' });
};
