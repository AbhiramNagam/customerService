//db queries


show databases;
CREATE DATABASE customer_service;

USE customer_service;

CREATE TABLE userlogin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);
INSERT INTO userlogin (username, password) VALUES ('user1', 'user1');

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
