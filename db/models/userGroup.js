'use strict'

const { INTEGER } = require('sequelize')

module.exports = db => db.define('userGroups', {
  points: {
    type: INTEGER,
    defaultValue: 1000
  }
})

module.exports.associations = (userGroup, {User, Group}) => {
  userGroup.belongsTo(User)
  userGroup.belongsTo(Group)
}
