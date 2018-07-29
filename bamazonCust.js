let BamazonDb = require('./BamazonDb')
let inquirer = require('inquirer')

let db = new BamazonDb('bamazon')

function start() {
    inquirer.prompt([
        {
            name: 'task',
            message: 'Welcome to Bamazon! What would you like to do?',
            type: 'list',
            choices: [
                'Add items to your cart',
                'Checkout',
                'Exit',
            ],
            filter: val => {
                switch(val) {
                    case 'Add items to your cart':
                        return 'shop'
                    case 'Checkout':
                        return 'checkout'
                    case 'Exit':
                        return 'exit'
                    default:
                        console.log('Command not supported')
                }
            }
        }
    ]).then(choice => {
        switch(choice.task) {
            case 'shop':
                shopping()
            case 'checkout':
                checkout()
            case 'exit':
                process.exit()
            default:
        }
    }).catch(err => {throw err})
}
start()
function checkout() {
    db.addProduct({
        name: 'Bucket',
        dept: 'Garden',
        price: 7.00,
        qty: 2000
    })
}
function shopping() {
    let items = db.getProducts()
    console.log(items)
    items.then(products => {
        console.log('products: ' + products)
        for (const item of products) {
            let itemData = '\n'
            for (const key in item) {
                itemData += `${key}: ${item[key]}`
            }
            console.log(itemData)
        }    
    }).catch(err => {throw err})

    // let choice = await inquirer.prompt([
    //         {
    //             name: 'item',
    //             message: 'What item would you like to add to your cart?'
    //         }
    //     ])
    // console.log(choice)
    // let addItem = await db.addCart(choice.item)
    // console.log(addItem)
}

