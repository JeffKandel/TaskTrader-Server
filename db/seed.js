'use strict'

const db = require('./db'),
  { User, Group, Bounty, Category, Task, UserGroup, Promise } = db,
  { mapValues } = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
  }

  seeded.groups = groups(seeded)
  // seeded.tasks = tasks(seeded)
  // seeded.bounties = bounties(seeded)
  // seeded.categories = categories(seeded)
  seeded.userGroups = userGroups(seeded)

  return Promise.props(seeded)
}


const users = seed(User, {
  jason: {
    name: 'Jason',
    password: '123',
    image: 'default.png',
    phoneNumber: process.env.PHONE_NUMBER_ONE,
    email: process.env.EMAIL_NUMBER_ONE,
    groupId: 1
  },
  jeff: {
    name: 'Jeff',
    password: '123',
    image: 'default.png',
    phoneNumber: process.env.PHONE_NUMBER_TWO,
    email: process.env.EMAIL_NUMBER_TWO,
    groupId: 1
  }
})

const groups = seed(Group, {
  fullstack: {
    name: 'Fullstack',
    description: 'chorely group',
    image: 'default.png',

  },
  apartment: {
    name: 'Apartment',
    description: 'apartment',
    image: 'default.png',
  },
})

const userGroups = seed(UserGroup,
  ({users, groups}) => ({
    'jason fullstack': {
      group_id: groups.fullstack.id,
      user_id: users.jason.id
    },
    'jeff fullstack': {
      group_id: groups.fullstack.id,
      user_id: users.jeff.id
    },
  })
)

// const categories = seed(Category, {
//   fullstack: {
//     name: 'Fullstack',
//   },
//   apartment: {
//     name: 'stuff'
//   },
// })
//
// const tasks = seed(Task, {
//   code: {
//     description: 'code',
//     categories: 'default.png',
//   },
//   review: {
//     description: 'review',
//     categories: 'default.png',
//   },
//
// })
// const bounties = seed(Bounty, {
//   fullstack: {
//     amount: 1
//   },
// })


if (module === require.main) {
  db.didSync
    .then(() => db.sync({ force: true }))
    .then(seedEverything())
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others = {}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
          // Is other a function? If so, call it. Otherwise, leave it alone.
          typeof other === 'function' ? other() : other)
      ).then(rows)
    }
    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
        .map(key => {
          const row = rows[key]
          return {
            key,
            value: Promise.props(row)
              .then(row => Model.create(row)
                .catch(error => {
                  throw new BadRow(key, row, error) })
              )
          }
        }).reduce(
          (all, one) => Object.assign({}, all, {
            [one.key]: one.value }), {}
        )
      ))
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed)
