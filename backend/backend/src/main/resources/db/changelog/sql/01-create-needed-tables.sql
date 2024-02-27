--liquibase formatted sql
--changeset Mateja:create-tables spitStatement:true andDelimiter:;


CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    active BIT,
    password VARCHAR(100),
    roles VARCHAR(30),
    user_name VARCHAR(30)
);
