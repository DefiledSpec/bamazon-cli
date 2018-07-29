let mysql = require('mysql')

class BamazonDb {
    constructor(db) {
        this.db = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: db
        })
        this.db.connect()
    }
    addProduct(item) {
        if(item) {
            let table = 'products'
            return new Promise((resolve, reject) => {
                let sql = `INSERT INTO ${table} (product_name, department_name, price, stock_quantity)
                VALUES (item.name, item.dept, item.price, item.qty)`
                this.db.query(sql, (err, res) => {
                    if (err) reject(err)
                    this.db.end()
                    resolve(res)
                })
            })
        }
    }
    getProducts(search) {
        search = search ? search : '*'
        let table = 'products'
        return new Promise((resolve, reject) => {
            let sql = `SELECT ${search} FROM ${table}`
            this.db.query(sql, (err, res) => {
                if (err) {return Promise.reject(err)}
                this.db.end();
                Promise.resolve(res);
            })
        })
    }
}

module.exports = BamazonDb
