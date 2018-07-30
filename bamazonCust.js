let BamazonDb = require('./BamazonDb')
let inquirer = require('inquirer')

let db = new BamazonDb()
shop()

async function start() {
    let { task } = await inquirer.prompt([
        {
            name: 'task',
            message: 'Welcome to Bamazon! What would you like to do?',
            type: 'list',
            choices: [
                'Shop',
                'Buy',
                'Exit',
            ]
        }
	])
	runTask(task)
}
async function buyItem(item) {
	try {
		let items = await db.getProducts()
		let ids = []
		for (const item of items) {
			ids.push(`${item.item_id}: ${item.product_name}`)
		}
		let { itemId, qty } = await inquirer.prompt([
			{
				name: 'itemId',
				message: 'What is the id of the item you\'d like to purchase?',
				type: 'list',
				choices: ids,
			},
			{
				name: 'qty',
				message: 'How many would you like to buy?',
				type: 'input',
				validate: val => !isNaN(val)
			}
		])
		let selectedId = itemId.split(': ')[0]
		let name = itemId.split(': ')[1]
		console.log(await db.updateQty(selectedId, qty, name))
	} catch(err) {
		throw err
	} finally {
		start()
	}
	
}
function exit() {
	db.close()
	process.exit()
}
async function shop() {
	try {
		let items = await db.getProducts()
		return displayProducts(items)
	} catch(err) {
		throw err
	} finally {
		start()
	}
}
function displayProducts(items) {
	let msg = 	'\n|Item ID| Product\t| Department\t| Price\t| Stock Qty\t|'
	for (const item of items) {
		let tab = item.product_name.length > 5 ? '\t' : '\t\t'
		msg += 	`\n| ${item.item_id}\t| ${item.product_name}${tab}|  ${item.department_name}\t| ${item.price}\t| ${item.stock_quantity}\t\t|`
	}
	console.log(msg + '\n')
}

function runTask(t) {
	if(!t) return
	switch(t) {
		case 'Shop':
		shop()
		break
	case 'Buy':
		buyItem()
		break
	case 'Exit':
		db.close()
		exit()
		break
	default:
		msg = 'Something went wrong :('
		console.log(msg)
		start()
	}
}
