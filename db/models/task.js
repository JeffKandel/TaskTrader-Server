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
  }, {
    hooks: {
      afterUpdate: function(task) {
        console.log('hit afterUpdate hook')
        let maxBounty = task.bounties.reduce((oldMax, bounty) => {
          return Math.max(oldMax, bounty.amount)
        }, -1)
        if (task.status === 'Active') {
          db.UserGroup.findOne({
            where: {
              group_id: task.group_id,
              user_id: task.debtor_id
            }
          })
            .then(userGroupRow => {
              userGroupRow.update({
                points: userGroupRow.points - maxBounty
              })
            })
            .catch(console.error)
        }
      },
      afterBulkUpdate: function() {
        let maxBounty
        this.findAll({
          where: {
            status: 'Processing'
          },
          include: [{model: db.Bounty}]
        })
          .then(processingTask => {
            const task = processingTask[0]
            maxBounty = task.bounties.reduce((oldMax, bounty) => {
              return Math.max(oldMax, bounty.amount)
            }, -1)
            task.update({status: 'Complete'})
            return db.UserGroup.findOne({
                where: {
                  group_id: task.group_id,
                  user_id: task.assignee_id
                }
              })
            })
          .then(userGroupRow => {
            userGroupRow.update({
              points: userGroupRow.points + maxBounty
            })
          })
          .catch(console.error)
      }
    }
  });

module.exports.associations = (Task, { User, Bounty, Category, TaskCategory, BountyTask, Group }) => {
  Task.belongsToMany(Bounty, { through: BountyTask});
  Task.belongsToMany(Category, { through: TaskCategory });
  Task.belongsTo(User, { as: 'creator' });
  Task.belongsTo(User, { as: 'assignee' });
  Task.belongsTo(User, { as: 'debtor' });
  Task.belongsTo(Group);
};
