CREATE DATABASE vulpes_data;
CREATE TABLE people (
  nick VARCHAR(255) NOT NULL,
  email VARCHAR(64) NOT NULL,
  phone INT NOT NULL,
  cpf INT NOT NULL,
  PRIMARY KEY(cpf)
)