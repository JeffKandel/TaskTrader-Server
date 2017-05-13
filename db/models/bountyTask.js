'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('bountyTasks', {}, {
  hooks: {
    afterCreate: function(association) {
      association.getTask({include: [{model: db.Group, include: [{model: db.User}]}, {model: db.Bounty, include: [{model: db.User}]}]})
        .then(task => {
          if (task.group.users.length === task.bounties.length) {
            let minBounty = {amount: 101}
            let maxBounty = {amount: -1}
            for (let i = 0; i < task.bounties.length; i++) {
              if (task.bounties[i].amount > maxBounty.amount) maxBounty = task.bounties[i]
              if (task.bounties[i].amount < minBounty.amount) minBounty = task.bounties[i]
            }
            task.update({
              status: 'Active',
              assignee_id: minBounty.user.id,
              debtor_id: maxBounty.user.id
            })
          }
        })
    }
  }
})

module.exports.associations = (BountyTask, {Bounty, Task}) => {
  BountyTask.belongsTo(Bounty)
  BountyTask.belongsTo(Task)
}
