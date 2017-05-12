'use strict';

const { INTEGER } = require('sequelize');

module.exports = db =>
  db.define('bounties', {
    amount: INTEGER
  }, {
    hooks: {
      afterCreate: function(createdBounty) {
        console.log(createdBounty[0].getTasks({include: {model: 'Task'}}))
      }
    }
  });

module.exports.associations = (Bounty, { Task, BountyTask, User }) => {
  Bounty.belongsToMany(Task, { through: BountyTask });
  Bounty.belongsTo(User)
};
