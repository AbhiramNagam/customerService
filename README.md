//db queries

//NOTE: For admin login the default username and password is 'admin'

CREATE DATABASE customerServiceDatabase;

USE customerServiceDatabase;

CREATE TABLE userlogin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);
INSERT INTO userlogin (username, password) VALUES ('user1', 'user1');

CREATE TABLE customerIssuesData (
    issueID INT AUTO_INCREMENT PRIMARY KEY,
    issueUser VARCHAR(50),
    issueType VARCHAR(50),
    issueDescription TEXT,
    issueStatus VARCHAR(25) DEFAULT 'pending'
);
select * from customerIssuesData;
