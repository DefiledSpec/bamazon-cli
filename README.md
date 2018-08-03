# Bamazon CLI

<!-- [![HitCount](http://hits.dwyl.io/defiledspec/bamazon-cli.svg)](http://hits.dwyl.io/defiledspec/bamazon-cli) -->

Bamazon is an 'amazon like' storefront on the command line, written in node and using mySQL for data storage.

![node.js](./screenshots/nodejs-75x75.png)

![node.js](./screenshots/mysql-100x50.png)

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

![SQL queries in Workbench](./screenshots/sql-server-con-200x75.png)

Copy the contents of `bamzon.sql` provided in the bamazon-cli folder into your mySQL Workbench and run the script by clicking this button ![Execute Script Button](./screenshots/lightning-bolt-15x15.png).

![SQL queries in Workbench](./screenshots/mysql-script-300x200.png)

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

  ![Customer CLI home view](./screenshots/cust-home-400x175.png)

Select one of the options provided.

### Shop

* Displays a list of all items currently in stock.

  ![Customer shopping flow](./screenshots/cust-shop-400x175.png)

### Buy

1. Returns a list of items avaliable for purchase.

   ![Customer buy list](./screenshots/cust-buy1-500x120.png)

2. Prompts the user to enter a quantity.

   ![Customer buy quantity](./screenshots/cust-buy2-350x30.png)
  
* If the store has enough of the item, the order is fulfuilled.

   ![Customer buy successful](./screenshots/cust-buy3-500x130.png)
  
* However if the store doesn't have enought than the order is rejcted and the user is notified.

   ![Customer buy insufficient](./screenshots/cust-buy4-500x130.png)

### Exit

* Closes the Bamazon Customer CLI.

## Manager CLI

---

To use Bamazon as a manager run `node bamazonManager.js` in *bash*.

![Manager CLI home view](./screenshots/man-home-300x120.png)

Select one of the options provided.

### Show Products

* Displays a list of all the poducts in the database.

   ![Manager list](./screenshots/man-products-275x130.png)

### Add Item

1. Prompts the user for the new items' *name*.

   ![Manager add name](./screenshots/man-add1-300x40.png)

2. Prompts the user to select from a list of *departments*.

   ![Manager add department](./screenshots/man-add2-350x70.png)

3. Prompts the user to enter the *sale price* of the item.

   ![Manager add sale price](./screenshots/man-add3-300x20.png)

4. Prompts the user for the amount of that item in *stock*.

   ![Manager add stock](./screenshots/man-add4-290x17.png)

* Finally the user is prompted asking if they would like to *add another* item.

  ![Manager add more?](./screenshots/man-add5-350x150.png)

### View Low Stock
  
* Returns a list of items in the store that have a *stock less than 5*.

  ![Manager low stock](./screenshots/man-low-350x100.png)

### Update Stock Quantity

1. Prompts the user to *select an item* from the list.

   ![Manager update item](./screenshots/man-update1-350x150.png)

2. Prompts the user to input how many of that item to add to *stock*

   ![Manager update done](./screenshots/man-update3-325x75.png)

* Delete Item (Extra Feature for Dev)

1. Prompts the user to input the id of the item they would like to delete.

   ![Manager delete](./screenshots/man-del1-350x32.png)

* If that item exists, it is *deleted* from the database.

   ![Manager delete](./screenshots/man-del3-350x90.png)

* If the item doesnt exits, the user is notified and *nothing happens* on the backend.

   ![Manager delete](./screenshots/man-del2-350x90.png)

* Exit
  
  * Closes the Bamazon Manager CLI.