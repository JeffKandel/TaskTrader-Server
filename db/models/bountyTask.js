'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('bountyTasks')

module.exports.associations = (BountyTask, {Bounty, Task}) => {
  BountyTask.belongsTo(Bounty)
  BountyTask.belongsTo(Task)
}
