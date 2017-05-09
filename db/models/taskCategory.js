'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('taskCategories')

module.exports.associations = (TaskCategory, {Task, Category}) => {
  TaskCategory.belongsTo(Task)
  TaskCategory.belongsTo(Category)
}
