let inquirer = require('inquirer')
let BamazonDB = require('./BamazonDB')

let db = new BamazonDB()
start()

async function start() {
	try {
		let { task } = await inquirer.prompt([{
			type: 'list',
			name: 'task',
			message: 'What would you like to do?',
			choices: [
				'Show Products',
				'Add Item',
				'Update Stock Quantity',
				'Delete Item',
				'Exit'
			]
		}])
		runTask(task)
	} catch(err) {
		throw err
	}
}

async function updateItem() {
	try {
		let { itemId } = await inquirer.prompt([{
			type: 'input',
			name: 'itemId',
			message: 'Which item would you like to update?',
			validate: (val) => !isNaN(val),
		}])
		console.log(await db.updateQty(itemId))
	} catch(err) {
		throw err
	} finally {
		start()
	}
}

async function addItem(item) {
	try {
		let { name, dept, price, qty } = await inquirer.prompt([
			{
				name: 'name',
				message: 'What is the name of the item?',
				type: 'input'
			},
			{
				name: 'dept',
				message: 'What is the items department?',
				type: 'list',
				choices: [
					'Garden',
					'Tools',
					'Other'
				]
			},
			{
				name: 'price',
				message: 'What is the price of the item?',
				type: 'input',
				validate: val => !isNaN(val),
			},
			{
				name: 'qty',
				message: 'How many do we have in stock?',
				type: 'input',
				validate: val => !isNaN(val),
			},
		])
		console.log(await db.addProduct({ name, dept, price, qty }))
	}catch(err) {
		throw err
	}finally{
		start()
	}
}

async function showProducts(item) {
	try {
		item = item ? item : false
		let items = await db.getProducts(item)
		displayProducts(items)
	}catch(err) {
		throw err
	} finally {
		start()
	}
}

async function deleteItem() {
	try {
		let { itemId } = await inquirer.prompt([
			{
				name: 'itemId',
				message: 'What is the id of the item you would like to delete?',
				type: 'input',
				validate: val => !isNaN(val)
			}
		])	
		console.log(await db.deleteItem(itemId))
		let { another } = await inquirer.prompt([
			{
				name: 'another',
				message: 'Would you like to delete another item?',
				type: 'confirm'
			}
		])
		if(another) {
			deleteItem()
		}else{
			start()
		}
	} catch(err) {
		throw err
	}
}
function displayProducts(items) {
	let msg = 	'\n|Item ID| Product\t| Department\t| Price\t| Stock Qty\t|'
	for (const item of items) {
		msg += 	`\n| ${item.item_id}\t| ${item.product_name}\t|  ${item.department_name}\t| ${item.price}\t| ${item.stock_quantity}\t\t|`
	}
	console.log(msg)
}

function runTask(t) {
	if(!t) return
	switch(t) {
		case 'Update Stock Quantity':
		updateItem()
		break
	case 'Add Item':
		addItem()
		break
	case 'Show Products':
		showProducts()
		break
	case 'Delete Item':
		deleteItem()
		break
	case 'Exit':
		db.close()
		process.exit()
		break
	default:
		msg = 'Something went wrong :('
		console.log(msg)
		start()
	}
}
