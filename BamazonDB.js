let mysql = require('mysql')

class BamazonDb {
    constructor() {
        this.db = mysql.createPool({
			connectionLimit: 10,
			host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'bamazon'
		})
		this.table = 'products'
	}
	async updateQty(itemId, qty, name) {
		qty = qty ? qty : 1
		let item = await this.getProducts(itemId)
		if(item[0].stock_quantity >= qty) {
			return new Promise(async (resolve, reject) => {
				let sql = `UPDATE products SET stock_quantity = stock_quantity - ${qty} WHERE item_id = ${itemId}`
				this.db.query(sql, (err, result) => {
					if (err) reject(err)
					let message = `\nSuccessfully purchased ${qty} x ${name}(s).\n`
					resolve(message)
				})
			})
		} else {
			return '\nInsufficient Quantity\n'
		}
	}
	close() {
		this.db.end()
	}
    addProduct(item) {
        if(item) {
            return new Promise((resolve, reject) => {
                let sql = `INSERT INTO ${this.table} (product_name, department_name, price, stock_quantity)
				VALUES ('${item.name}', '${item.dept}', ${item.price}, ${item.qty})`
                this.db.query(sql, (err, result) => {
					if (err) reject(err)
					if (result) {
						let { affectedRows, insertId } = result
						let message = `\nSuccessfully inserted '${item.name}'. Rows Affected: ${affectedRows} | ID: ${insertId}\n`
						resolve(message)
					} else {
						reject('Item could not be inserted.')
					}
                })
            })
        }else{
			console.log('no item')
		}
	}
	deleteItem(itemId) {
		return new Promise((resolve, reject) => {
			let sql = `DELETE FROM ${this.table} WHERE item_id = ${itemId}`
			this.db.query(sql, (err, result) => {
				if (err) reject(err)
				let message = result.affectedRows > 0 
				? `\nSuccessfully deleted Id: ${itemId}\n`
				: `\nFailed to delete Id: ${itemId}. Item doesn't exist.\n` 
				resolve(message)
			})
		})
	}
	getLowStock() {
		let sql = `SELECT * FROM ${this.table} WHERE stock_quantity < 5`
		return new Promise((resolve, reject) => {
			this.db.query(sql, (err, result) => {
				if(err) reject(err)
				resolve(result)
			})
		})
	}
    getProducts(itemId) {
		let sql = `SELECT * FROM ${this.table} `
		if(itemId) { 
			sql += `WHERE item_id = ${itemId}`
		}
        return new Promise((resolve, reject) => {
            this.db.query(sql, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }
}

module.exports = BamazonDb
