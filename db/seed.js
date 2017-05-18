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
  'jason': {
    name: 'Jason',
    password: '123',
    image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAtAAAAAJDc0YmZlODdkLTBmYzktNDY4NC1iZWExLWQ3YjcxMzIwYzg1MA.jpg',
    phoneNumber: process.env.PHONE_NUMBER_ONE,
    email: process.env.EMAIL_NUMBER_ONE
  },
  jeff: {
    name: 'Jeff',
    password: '123',
    image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAh2AAAAJDcyMWQ5NGJhLTY4YmEtNDc3MS05ZjA5LTY5NTBiOTE5YmQwNw.jpg',
    phoneNumber: process.env.PHONE_NUMBER_TWO,
    email: process.env.EMAIL_NUMBER_TWO
  },
  danny: {
    name: 'Danny',
    password: '123',
    image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAq6AAAAJGE0YzI2YjM3LWY4MjMtNDI2Zi04M2M1LTgwZTQ5ZWM4MTcxMA.jpg',
    phoneNumber: process.env.PHONE_NUMBER_THREE,
    email: process.env.EMAIL_NUMBER_THREE
  },
  demo1: {
    name: 'Demo User 1',
    password: 'demo',
    email: 'DemoUser1@example.com'
  },
  demo2: {
    name: 'Demo User 2',
    password: 'demo',
    email: 'DemoUser2@example.com'
  }
});

const groups = seed(Group, {
  fullstack: {
    name: 'Fullstack Academy',
    description: 'FSA-NY 1702',
    icon: 'school'
  },
  chorely: {
    name: 'Chorely',
    description: 'Capstone Project Team',
    icon: 'code'
  },
  home: {
    name: 'Home',
    description: 'Apartment 1406',
    icon: 'home'
  },
  demo: {
    name: 'Demo Group',
    description: 'Test features here!',
    icon: 'folder'
  }
});

const userGroups = seed(UserGroup, ({ users, groups }) => ({
  'jason fullstack': {
    group_id: groups.fullstack.id,
    user_id: users.jason.id,
    points: 820
  },
  'jeff fullstack': {
    group_id: groups.fullstack.id,
    user_id: users.jeff.id,
    points: 1180
  },
  'jason chorely': {
    group_id: groups.chorely.id,
    user_id: users.jason.id,
    points: 855
  },
  'jeff chorely': {
    group_id: groups.chorely.id,
    user_id: users.jeff.id,
    points: 1315
  },
  'danny chorely': {
    group_id: groups.chorely.id,
    user_id: users.danny.id,
    points: 830
  },
  'jason home': {
    group_id: groups.home.id,
    user_id: users.jason.id,
    points: 1000
  },
  'jeff home': {
    group_id: groups.home.id,
    user_id: users.jeff.id,
    points: 1000
  },
  'danny home': {
    group_id: groups.home.id,
    user_id: users.danny.id,
    points: 1000
  },
  'demo user 1': {
    group_id: groups.demo.id,
    user_id: users.demo1.id,
    points: 1000
  },
  'demo user 2': {
    group_id: groups.demo.id,
    user_id: users.demo2.id,
    points: 1000
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
    description: 'Send poll for social committee',
    status: 'Complete',
    group_id: groups.fullstack.id,
    creator_id: users.jason.id,
    assignee_id: users.jeff.id,
    debtor_id: users.jason.id
  },
  review: {
    description: 'Collect contact info',
    status: 'Pending',
    group_id: groups.fullstack.id,
    creator_id: users.jeff.id,
  },
  debug: {
    description: 'Order class t-shirts',
    status: 'Pending',
    group_id: groups.fullstack.id,
    creator_id: users.jason.id
  },
  cleanDishes: {
    description: 'Clean the dishes',
    status: 'Pending',
    group_id: groups.home.id,
    creator_id: users.jason.id
  },
  viz: {
    description: 'Setup some data visualization',
    status: 'Complete',
    group_id: groups.chorely.id,
    creator_id: users.jason.id,
    assignee_id: users.jeff.id,
    debtor_id: users.danny.id
  },
  db: {
    description: 'Add more seed data',
    status: 'Complete',
    group_id: groups.chorely.id,
    creator_id: users.danny.id,
    assignee_id: users.danny.id,
    debtor_id: users.jason.id
  },
  idea: {
    description: 'Write the demo script',
    status: 'Complete',
    group_id: groups.chorely.id,
    creator_id: users.jason.id,
    assignee_id: users.jason.id,
    debtor_id: users.danny.id
  },
  dupe1: {
    description: 'Remove duplicate task',
    status: 'Complete',
    group_id: groups.chorely.id,
    creator_id: users.danny.id,
    assignee_id: users.danny.id,
    debtor_id: users.jeff.id
  },
  dupe2: {
    description: 'Remove duplicate task',
    status: 'Complete',
    group_id: groups.chorely.id,
    creator_id: users.danny.id,
    assignee_id: users.jeff.id,
    debtor_id: users.danny.id
  }
}));

const bounties = seed(Bounty, ({ tasks, users }) => ({
  seventyFive: {
    amount: 75,
    user_id: users.jeff.id
  },
  threeHundred: {
    amount: 300,
    user_id: users.jason.id
  },
  oneEighty: {
    amount: 180,
    user_id: users.jason.id
  },
  vizJason: {
    amount: 110,
    user_id: users.jason.id
  },
  dbJason: {
    amount: 430,
    user_id: users.jason.id
  },
  ideaJason: {
    amount: 60,
    user_id: users.jason.id
  },
  dupe1Jason: {
    amount: 190,
    user_id: users.jason.id
  },
  dupe2Jason: {
    amount: 130,
    user_id: users.jason.id
  },
  vizJeff: {
    amount: 65,
    user_id: users.jeff.id
  },
  dbJeff: {
    amount: 200,
    user_id: users.jeff.id
  },
  ideaJeff: {
    amount: 125,
    user_id: users.jeff.id
  },
  dupe1Jeff: {
    amount: 320,
    user_id: users.jeff.id
  },
  dupe2Jeff: {
    amount: 95,
    user_id: users.jeff.id
  },
  vizDanny: {
    amount: 165,
    user_id: users.danny.id
  },
  dbDanny: {
    amount: 145,
    user_id: users.danny.id
  },
  ideaDanny: {
    amount: 285,
    user_id: users.danny.id
  },
  dupe1Danny: {
    amount: 70,
    user_id: users.danny.id
  },
  dupe2Danny: {
    amount: 150,
    user_id: users.danny.id
  }
}));

const bountyTasks = seed(BountyTask,
  ({bounties, tasks}) => ({
    'oneEightyCode': {
      bounty_id: bounties.oneEighty.id,
      task_id: tasks.code.id
    },
    'threeHundredCode': {
      bounty_id: bounties.seventyFive.id,
      task_id: tasks.code.id
    },
    'oneEightyReview': {
      bounty_id: bounties.seventyFive.id,
      task_id: tasks.review.id
    },
    'threeHundredcleanDishes': {
      bounty_id: bounties.threeHundred.id,
      task_id: tasks.cleanDishes.id
    },
    'oneEightyDebug': {
      bounty_id: bounties.oneEighty.id,
      task_id: tasks.debug.id
    },
    vizJason: {
      bounty_id: bounties.vizJason.id,
      task_id: tasks.viz.id
    },
    dbJason: {
      bounty_id: bounties.dbJason.id,
      task_id: tasks.db.id
    },
    ideaJason: {
      bounty_id: bounties.ideaJason.id,
      task_id: tasks.idea.id
    },
    dupe1Jason: {
      bounty_id: bounties.dupe1Jason.id,
      task_id: tasks.dupe1.id
    },
    dupe2Jason: {
      bounty_id: bounties.dupe2Jason.id,
      task_id: tasks.dupe2.id
    },
    vizJeff: {
      bounty_id: bounties.vizJeff.id,
      task_id: tasks.viz.id
    },
    dbJeff: {
      bounty_id: bounties.dbJeff.id,
      task_id: tasks.db.id
    },
    ideaJeff: {
      bounty_id: bounties.ideaJeff.id,
      task_id: tasks.idea.id
    },
    dupe1Jeff: {
      bounty_id: bounties.dupe1Jeff.id,
      task_id: tasks.dupe1.id
    },
    dupe2Jeff: {
      bounty_id: bounties.dupe2Jeff.id,
      task_id: tasks.dupe2.id
    },
    vizDanny: {
      bounty_id: bounties.vizDanny.id,
      task_id: tasks.viz.id
    },
    dbDanny: {
      bounty_id: bounties.dbDanny.id,
      task_id: tasks.db.id
    },
    ideaDanny: {
      bounty_id: bounties.ideaDanny.id,
      task_id: tasks.idea.id
    },
    dupe1Danny: {
      bounty_id: bounties.dupe1Danny.id,
      task_id: tasks.dupe1.id
    },
    dupe2Danny: {
      bounty_id: bounties.dupe2Danny.id,
      task_id: tasks.dupe2.id
    }
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
