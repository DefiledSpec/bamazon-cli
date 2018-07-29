create database bamazon;

use bamazon;

create table products (
    item_id integer(20) primary key auto_increment,
    product_name varchar(255),
    department_name varchar(255),
    price decimal(5,2),
    stock_quantity integer(20)
);

insert into products (product_name, department_name, price, stock_quantity)
values ('Hammer', 'Tools', 7.05, 1000);