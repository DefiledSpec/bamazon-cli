let mysql = require('mysql')

class BamazonDb {
    constructor() {
        this.db = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'bamazon'
		})
		this.table = 'products'
        this.db.connect()
    }
    addProduct(item) {
        if(item) {
            return new Promise((resolve, reject) => {
                let sql = `INSERT INTO ${this.table} (product_name, department_name, price, stock_quantity)
				VALUES ('${item.name}', '${item.dept}', ${item.price}, ${item.qty});`
                this.db.query(sql, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                    // this.db.end()
                })
            })
        }else{
			console.log('no item')
		}
    }
    getProducts(search) {
        search = search ? search : '*'
        return new Promise((resolve, reject) => {
            let sql = `SELECT ${search} FROM ${this.table};`
            this.db.query(sql, (err, result) => {
                if (err) reject(err)
                resolve(result);
                this.db.end();
            })
        })
    }
}

module.exports = BamazonDb
