'use strict'

const db = require('../server/db')
const {User, Product, Order, Product_Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {
      username: 'andrew',
      firstName: 'Andrew',
      lastName: 'G',
      email: 'test1@email.com',
      isAdmin: true,
      password: '123'
    },
    {
      username: 'pawan',
      firstName: 'Pawan',
      lastName: 'B',
      email: 'test2@email.com',
      isAdmin: false,
      password: '123'
    },
    {
      username: 'tanveer',
      firstName: 'Tanveer',
      lastName: 'S',
      email: 'test3@email.com',
      isAdmin: false,
      password: '123'
    },
    {
      username: 'horace',
      firstName: 'Horace',
      lastName: 'Z',
      email: 'test4@email.com',
      isAdmin: false,
      password: '123'
    }
  ]

  const products = [
    {
      productName: 'Cool Ranch',
      qty: 100,
      price: 299,
      imageUrl:
        'https://cdn.minibardelivery.com/products/164005/product/51N4T5yXeV.jpg',
      description: 'A very cool flavor of Dorito'
    },
    {
      productName: 'Nacho Cheese',
      qty: 100,
      price: 299,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71MQeIS7FAL._SL1500_.jpg',
      description: 'Quite a cheesy flavor of Dorito'
    },
    {
      productName: 'Mountain Dew',
      qty: 100,
      price: 299,
      imageUrl:
        'https://img1.mashed.com/img/gallery/this-strange-new-doritos-flavor-has-everyone-talking/intro-1586545091.jpg',
      description: 'A questionable flavor of Dorito'
    },
    {
      productName: 'Spicy Sweet Chili',
      qty: 100,
      price: 299,
      imageUrl:
        'https://vegansfirst.com/wp-content/uploads/2020/04/doritos.jpg',
      description: 'A very savory flavor of Dorito'
    }
  ]

  // for (let i = 0; i < 100; i++) {
  //   users.push({
  //     username: 'userbot' + i,
  //     firstName: 'Do',
  //     lastName: 'Rito',
  //     email: 'dorito' + i + '@chips.com',
  //     isAdmin: false,
  //     password: '123'
  //   })
  // }

  // for (let i = 0; i < 100; i++) {
  //   products.push({
  //     productName: 'Dorito Flavor #' + i,
  //     qty: 500,
  //     price: 299,
  //     imageUrl: 'https://i.ebayimg.com/images/g/A0kAAOSwZ41eeIYb/s-l640.jpg',
  //     description: 'New Doritos'
  //   })
  // }

  const createdUsers = await Promise.all(users.map(user => User.create(user)))
  const createdProjects = await Promise.all(
    products.map(product => Product.create(product))
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
