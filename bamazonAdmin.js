let inquirer = require('inquirer')
let BamazonDB = require('./BamazonDB')

let db = new BamazonDB()
const itemdb = {
	name: 'Bucket',
	dept: 'Garden',
	price: 7.00,
	qty: 2000
}
async function start() {
	// showProducts()
	addItem(itemdb)
}
start()

async function addItem(item) {
	try {
		let { affectedRows, insertId } = await db.addProduct(item)
		console.log(`Successfully inserted '${item.name}'. Rows Affected: ${affectedRows} | ID: ${insertId}`)
	}catch(err) {
		throw err
	}finally{
		showProducts()
	}
}

async function showProducts() {
	try {
		let items = await db.getProducts()
		let msg = 	'\n|Item ID| Product\t| Department\t| Price\t| Stock Qty\t|'
		for (const item of items) {
			msg += 	`\n| ${item.item_id}\t| ${item.product_name}\t|  ${item.department_name}\t| ${item.price}\t| ${item.stock_quantity}\t\t|`
		}
		console.log(msg)
	}catch(err) {
		throw err
	}
}


