# Bamazon CLI

[![HitCount](http://hits.dwyl.io/defiledspec/bamazon-cli.svg)](http://hits.dwyl.io/defiledspec/bamazon-cli)

Bamazon is an 'amazon like' storefront on the command line, written in node and using mySQL for data storage.

![node.js](./screenshots/nodejs.png =75x75)

![node.js](./screenshots/mysql.png =100x50)

## Getting Started

### Requirements

* node.js

* mySQL Server

* mySQL Workbench

## Setup

First clone the repo using *bash*.

 ```bash
 git clone https://github.com/DefiledSpec/bamazon-cli.git
 ```

Cd into the directory and install the required dependencies.

 ```bash
 cd bamazon-cli/ && npm install
 ```

Open mySQL Workbench and connect to your local mySQL Server.

![SQL queries in Workbench](./screenshots/sql-server-con.png =200x75)

Copy the contents of `bamzon.sql` provided in the bamazon-cli folder into your mySQL Workbench and run the script by clicking this button ![Execute Script Button](./screenshots/lightning-bolt.png =15x15).

![SQL queries in Workbench](./screenshots/mysql-script.png =x200)

Finally in `BamazonDB.js` confirm that the `user`, `password`, and `host` fields are correct for your own database connection.

```js
this.db = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1', // localhost
    user: 'root',
    password: 'root',
    database: 'bamazon'
})
```

## Usage

\* Please note that to view items you must add them first using the Manager CLI. \*

## Customer CLI

---

To use Bamazon as a customer run `node bamazonCust.js` in *bash*.

  ![Customer CLI home view](./screenshots/cust-home.png =400x175)

Select one of the options provided.

### Shop

* Displays a list of all items currently in stock.

  ![Customer shopping flow](./screenshots/cust-shop.png =400x175)

### Buy

1. Returns a list of items avaliable for purchase.

   ![Customer buy list](./screenshots/cust-buy1.png =500x120)

2. Prompts the user to enter a quantity.

   ![Customer buy quantity](./screenshots/cust-buy2.png =350x30)
  
* If the store has enough of the item, the order is fulfuilled.

   ![Customer buy successful](./screenshots/cust-buy3.png =500x130)
  
* However if the store doesn't have enought than the order is rejcted and the user is notified.

   ![Customer buy insufficient](./screenshots/cust-buy4.png =500x130)

### Exit

* Closes the Bamazon Customer CLI.

## Manager CLI

---

To use Bamazon as a manager run `node bamazonManager.js` in *bash*.

![Manager CLI home view](./screenshots/man-home.png =300x120)

Select one of the options provided.

### Show Products

* Displays a list of all the poducts in the database.

   ![Manager list](./screenshots/man-products.png =275x130)

### Add Item

1. Prompts the user for the new items' *name*.

   ![Manager add name](./screenshots/man-add1.png =x40)

2. Prompts the user to select from a list of *departments*.

   ![Manager add department](./screenshots/man-add2.png =x70)

3. Prompts the user to enter the *sale price* of the item.

   ![Manager add sale price](./screenshots/man-add3.png =x20)

4. Prompts the user for the amount of that item in *stock*.

   ![Manager add stock](./screenshots/man-add4.png =x17)

* Finally the user is prompted asking if they would like to *add another* item.

  ![Manager add more?](./screenshots/man-add5.png =x150)

### View Low Stock
  
* Returns a list of items in the store that have a *stock less than 5*.

  ![Manager low stock](./screenshots/man-low.png =x100)

### Update Stock Quantity

1. Prompts the user to *select an item* from the list.

   ![Manager update item](./screenshots/man-update1.png =x150)

2. Prompts the user to input how many of that item to add to *stock*

   ![Manager update done](./screenshots/man-update3.png =x75)

* Delete Item (Extra Feature for Dev)

1. Prompts the user to input the id of the item they would like to delete.

   ![Manager delete](./screenshots/man-del1.png =x32)

* If that item exists, it is *deleted* from the database.

   ![Manager delete](./screenshots/man-del3.png =x90)

* If the item doesnt exits, the user is notified and *nothing happens* on the backend.

   ![Manager delete](./screenshots/man-del2.png =x90)

* Exit
  
  * Closes the Bamazon Manager CLI.