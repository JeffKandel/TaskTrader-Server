'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('userGroups')

module.exports.associations = (userGroup, {User, Group}) => {
  userGroup.belongsTo(User)
  userGroup.belongsTo(Group)
}
