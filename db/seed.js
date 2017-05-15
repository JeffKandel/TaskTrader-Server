'use strict';

const db = require('./db'),
  { User, Group, Bounty, Category, Task, UserGroup, TaskCategory, BountyTask, Promise } = db,
  { mapValues } = require('lodash');

function seedEverything() {
  const seeded = {
    users: users(),
    groups: groups()
  };

  seeded.tasks = tasks(seeded);
  seeded.bounties = bounties(seeded);
  seeded.categories = categories(seeded);
  seeded.userGroups = userGroups(seeded);
  seeded.taskCategories = taskCategories(seeded);
  seeded.bountyTasks = bountyTasks(seeded)

  return Promise.props(seeded);
}

const users = seed(User, {
  jason: {
    name: 'Jason',
    password: '123',
    image: 'default.png',
    phoneNumber: process.env.PHONE_NUMBER_ONE,
    email: process.env.EMAIL_NUMBER_ONE
  },
  jeff: {
    name: 'Jeff',
    password: '123',
    image: 'default.png',
    phoneNumber: process.env.PHONE_NUMBER_TWO,
    email: process.env.EMAIL_NUMBER_TWO
  }
});

const groups = seed(Group, {
  fullstack: {
    name: 'Fullstack',
    description: 'chorely group',
    image: 'default.png'
  },
  apartment: {
    name: 'Apartment',
    description: 'apartment',
    image: 'default.png'
  }
});

const userGroups = seed(UserGroup, ({ users, groups }) => ({
  'jason fullstack': {
    group_id: groups.fullstack.id,
    user_id: users.jason.id
  },
  'jeff fullstack': {
    group_id: groups.fullstack.id,
    user_id: users.jeff.id
  }
}));

const categories = seed(Category, {
  home: {
    name: 'home'
  },
  work: {
    name: 'work'
  },
  kitchen: {
    name: 'kitchen'
  },
  coding: {
    name: 'coding'
  },
  cleaning: {
    name: 'cleaning'
  },
});

const taskCategories = seed(TaskCategory, ({ tasks, categories }) => ({
  'codeWork': {
    category_id: categories.work.id,
    task_id: tasks.code.id
  },
  'codeCoding': {
    category_id: categories.coding.id,
    task_id: tasks.code.id
  },
  'reviewWork': {
    category_id: categories.work.id,
    task_id: tasks.review.id
  },
  'reviewCoding': {
    category_id: categories.coding.id,
    task_id: tasks.review.id
  },
  'debugWork': {
    category_id: categories.work.id,
    task_id: tasks.debug.id
  },
  'debugCoding': {
    category_id: categories.coding.id,
    task_id: tasks.debug.id
  },
  'cleanDisheshome': {
    category_id: categories.home.id,
    task_id: tasks.cleanDishes.id
  },
  'cleanDishesCleaning': {
    category_id: categories.cleaning.id,
    task_id: tasks.cleanDishes.id
  },
  'cleanDishesKitchen': {
    category_id: categories.kitchen.id,
    task_id: tasks.cleanDishes.id
  },
}));

const tasks = seed(Task, ({ groups, users }) => ({
  code: {
    description: 'Write new SQL ORM',
    status: 'Completed',
    group_id: groups.fullstack.id,
    creator_id: users.jason.id,
    assignee_id: users.jason.id,
    debtor_id: users.jeff.id
  },
  review: {
    description: 'Review my pull request',
    status: 'Active',
    group_id: groups.fullstack.id,
    creator_id: users.jeff.id,
    assignee_id: users.jason.id,
    debtor_id: users.jeff.id
  },
  debug: {
    description: 'Help with debugging an issue',
    status: 'Pending',
    group_id: groups.fullstack.id,
    creator_id: users.jason.id
  },
  cleanDishes: {
    description: 'clean the Dishes',
    status: 'Pending',
    group_id: groups.apartment.id,
    creator_id: users.jason.id
  }
}));

const bounties = seed(Bounty, ({ tasks, users }) => ({
  oneK: {
    amount: 100,
    task_id: tasks.code.id,
    user_id: users.jason.id
  },
  eightHun: {
    amount: 80,
    task_id: tasks.code.id,
    user_id: users.jeff.id
  },
  SevFifty: {
    amount: 75,
    task_id: tasks.review.id,
    user_id: users.jeff.id
  },
  threeHun: {
    amount: 30,
    task_id: tasks.review.id,
    user_id: users.jason.id
  },
  twoK: {
    amount: 20,
    task_id: tasks.debug.id,
    user_id: users.jason.id
  },
  nineHun: {
    amount: 90,
    task_id: tasks.cleanDishes.id,
    user_id: users.jason.id
  }
}));

const bountyTasks = seed(BountyTask,
  ({bounties, tasks}) => ({
    'nineHunCode': {
      bounty_id: bounties.nineHun.id,
      task_id: tasks.code.id
    },
    'threeHunCode': {
      bounty_id: bounties.SevFifty.id,
      task_id: tasks.code.id
    },
    'nineHunReview': {
      bounty_id: bounties.nineHun.id,
      task_id: tasks.review.id
    },
    'oneKReview': {
      bounty_id: bounties.eightHun.id,
      task_id: tasks.review.id
    },
    'threeHuncleanDishes': {
      bounty_id: bounties.threeHun.id,
      task_id: tasks.cleanDishes.id
    },
    'nineHunDebug': {
      bounty_id: bounties.nineHun.id,
      task_id: tasks.debug.id
    },
  })
);

if (module === require.main) {
  db.didSync
    .then(() => db.sync({ force: true }))
    .then(seedEverything)
    .finally(() => process.exit(0));
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error);
    this.cause = error;
    this.row = row;
    this.key = key;
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`;
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
        mapValues(
          others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other
        )
      ).then(rows);
    }
    return Promise.resolve(rows)
      .then(rows =>
        Promise.props(
          Object.keys(rows)
            .map(key => {
              const row = rows[key];
              return {
                key,
                value: Promise.props(row).then(row =>
                  Model.create(row).catch(error => {
                    throw new BadRow(key, row, error);
                  })
                )
              };
            })
            .reduce(
              (all, one) =>
                Object.assign({}, all, {
                  [one.key]: one.value
                }),
              {}
            )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`);
        return seeded;
      })
      .catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`);
      });
  };
}

module.exports = Object.assign(seed);
