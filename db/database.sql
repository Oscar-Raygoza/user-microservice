-- CREATE DATABASE IF NOT EXISTS startup_db;

-- USE startup_db;

CREATE TABLE users (
  id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  rfc VARCHAR(13) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO users (name, lastname, email, rfc, zip_code) VALUES
  ('Juan', 'Pérez', 'juan.perez@example.com', 'JUAP850101XXX', '01000'),
  ('María', 'López', 'maria.lopez@example.com', 'MALO920202XXX', '02800'),
  ('Carlos', 'Ramírez', 'carlos.ramirez@example.com', 'CARA790303XXX', '11500'),
  ('Ana', 'García', NULL, 'ANGA880404XXX', '76000'),
  ('Luis', 'Fernández', 'luis.fernandez@example.com', 'LUFE850505XXX', '44100'),
  ('Lucía', 'Martínez', NULL, 'LUMA900606XXX', '83200'),
  ('Pedro', 'Hernández', 'pedro.hernandez@example.com', 'PEHE950707XXX', '54000'),
  ('Sofía', 'Castillo', 'sofia.castillo@example.com', 'SOCA910808XXX', '20000');

SELECT * FROM users;