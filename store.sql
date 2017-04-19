CREATE DATABASE bamazon_DB;

USE bamazon_DB;

drop table products;

CREATE TABLE products(
  item_id iNTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(140) NOT NULL,
  department_name VARCHAR(45)  NOT NULL,
  price Decimal(10,3) NULL,
  stock INTEGER(10) NOT NUll,
  PRIMARY KEY (item_id)
);

SELECT * FROM bamazon_DB.products;

INSERT INTO products (product_name, department_name, price, stock) values ("socks", "clothing", 3.99, 9)


