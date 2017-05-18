'use strict';

const { INTEGER } = require('sequelize');

module.exports = db =>
  db.define('bounties', {
    amount: INTEGER
  });

module.exports.associations = (Bounty, { Task, BountyTask, User }) => {
  Bounty.belongsToMany(Task, { through: BountyTask });
  Bounty.belongsTo(User)
};
