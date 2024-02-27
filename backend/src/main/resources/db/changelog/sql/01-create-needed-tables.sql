--liquibase formatted sql
--changeset Mateja:create-tables spitStatement:true andDelimiter:;


CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    active BIT,
    password VARCHAR(100),
    roles VARCHAR(30),
    user_name VARCHAR(30)
);

CREATE TABLE  komentar(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20),
    text VARCHAR(200),
    broj_lajkova INTEGER,
    broj_dislajkova INTEGER,
    vest_id INTEGER
);

CREATE TABLE Vest (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    naslov VARCHAR(255),
    text TEXT,
    tag VARCHAR(255),
    broj_lajkova INTEGER,
    broj_disajkova INTEGER,
    date TIMESTAMP,
    state VARCHAR(20),
    rubrika_id INTEGER,
    novinar_id INTEGER
);

CREATE TABLE Rubrika (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    naziv VARCHAR(255)
);

CREATE TABLE user_rubrika(
    user_id INTEGER,
    rubrika_id INTEGER
);
