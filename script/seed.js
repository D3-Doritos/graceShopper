'use strict'

const db = require('../server/db')
const {User, Product, Order, Product_Order} = require('../server/db/models')

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

  for (let i = 0; i < 100; i++) {
    users.push({
      username: 'userbot' + i,
      firstName: 'Do',
      lastName: 'Rito',
      email: 'dorito' + i + '@chips.com',
      isAdmin: false,
      password: '123'
    })
  }

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

  for (let i = 0; i < 100; i++) {
    products.push({
      productName: 'Dorito Flavor #' + i,
      qty: 500,
      price: 299,
      imageUrl: 'https://i.ebayimg.com/images/g/A0kAAOSwZ41eeIYb/s-l640.jpg',
      description: 'New Doritos'
    })
  }

  const createdUsers = await Promise.all(users.map(user => User.create(user)))
  const createdProjects = await Promise.all(
    products.map(product => Product.create(product))
  )

  for (let i = 1; i < users.length; i++) {
    const user = await User.findByPk(i)
    await user.createOrder()
    const order = await Order.findByPk(i)
    if (Math.random() < 0.6) {
      const productId = Math.floor(Math.random() * products.length)
      const product = await Product.findByPk(productId)
      await order.addProduct(product)

      const productOrder = await Product_Order.findOne({
        where: {orderId: i, productId: productId}
      })
      await productOrder.update({historicalPrice: product.price})
    }
  }
  // // find the user
  // const userOne = await User.findByPk(1)
  // const userTwo = await User.findByPk(2)
  // const userThree = await User.findByPk(3)

  // // find the product
  // const productOne = await Product.findByPk(1)
  // const productTwo = await Product.findByPk(2)
  // const productThree = await Product.findByPk(3)

  // // Create a Cart on our user
  // await userOne.createOrder()
  // await userTwo.createOrder()
  // await userThree.createOrder()

  // // Find order we created
  // const orderOne = await Order.findByPk(1)
  // const orderOne = await Order.findByPk(1)
  // const orderOne = await Order.findByPk(1)

  // // add product to order
  // await orderOne.addProduct(productOne)

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
