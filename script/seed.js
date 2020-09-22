'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {
      username: 'test1',
      firstName: 'Andrew',
      lastName: 'G',
      email: 'test1@email.com',
      isAdmin: true,
      password: '123'
    },
    {
      username: 'test2',
      firstName: 'Pawan',
      lastName: 'B',
      email: 'test2@email.com',
      isAdmin: false,
      password: '456'
    },
    {
      username: 'test3',
      firstName: 'Tanveer',
      lastName: 'S',
      email: 'test3@email.com',
      isAdmin: false,
      password: '789'
    }
  ]

  const products = [
    {
      productName: 'Cool Ranch',
      stockQty: 100,
      price: 2.99,
      imageUrl:
        'https://cdn.minibardelivery.com/products/164005/product/51N4T5yXeV.jpg',
      Description: 'A very cool flavor of Dorito'
    },
    {
      productName: 'Nacho Cheese',
      stockQty: 100,
      price: 2.99,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71MQeIS7FAL._SL1500_.jpg',
      Description: 'Quite a cheesy flavor of Dorito'
    },
    {
      productName: 'Mountain Dew',
      stockQty: 100,
      price: 2.99,
      imageUrl:
        'https://img1.mashed.com/img/gallery/this-strange-new-doritos-flavor-has-everyone-talking/intro-1586545091.jpg',
      Description: 'A questionable flavor of Dorito'
    },
    {
      productName: 'Spicy Sweet Chili',
      stockQty: 100,
      price: 2.99,
      imageUrl:
        'https://vegansfirst.com/wp-content/uploads/2020/04/doritos.jpg',
      Description: 'A very savory flavor of Dorito'
    }
  ]

  // const createdUsers = users.map(async (user) => {
  //   await User.create(user)
  // })
  // const createdProducts = products.map(async (product) => {
  //   await Product.create(product)
  // })

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com’, password: ‘123’}),
  //   User.create({email: 'murphy@email.com’, password: ‘123’})
  // ])

  // const promises = users.map(user => User.create(user))
  // const createdUsers = await Promise.all(promises)

  const createdUsers = await Promise.all(users.map(user => User.create(user)))
  const createdProjects = await Promise.all(
    products.map(product => Product.create(product))
  )

  const userOne = await User.findByPk(1)
  const productOne = await Product.findByPk(1)
  await userOne.addProduct(productOne)
  await userOne.createOrder({date: Date.now()})

  const orderOne = await Order.findByPk(1)
  await orderOne.addProduct(productOne)
  await orderOne.addProduct(productOne)

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
