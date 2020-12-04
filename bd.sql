#C:\Users\ALUMNO>cd c:\xampp\mysql\bin
#mysql -uroot -p --default_character_set utf8 < c:\xampp\htdocs\proyecto\bd.sql
#mysql -uroot -p ajedrez

DROP DATABASE IF EXISTS ajedrez;
CREATE DATABASE ajedrez CHARACTER SET utf8mb4;
USE ajedrez;

CREATE TABLE tablero (
  codigo INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  /*turno varchar (10) NOT NULL,*/
  partida varchar (2000) NOT NULL
  
);