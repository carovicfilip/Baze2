--liquibase formatted sql
--changeset Mateja:create-tables spitStatement:true andDelimiter:;

INSERT INTO users (user_name, password, active, roles) VALUES ('glavni', 'password', true, 'ROLE_GUREDNIK');
INSERT INTO rubrika (id,naziv) VALUES (1, "Politics"), (2, "Sport"), (3,"Entertainment"),(4, "Technology");
