CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(20) PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL(5,2),
    stock_quantity INTEGER(20)
);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) 
VALUES ('Hammer', 'Tools', 7.05, 1000);
