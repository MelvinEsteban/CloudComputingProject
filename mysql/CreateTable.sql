USE agendaDb;

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS agenda (
  id_agenda int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  id_user int NOT NULL,
  PRIMARY KEY (id_agenda),
  KEY id_user (id_user),
  CONSTRAINT agenda_ibfk_1 FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS events (
  id_event int NOT NULL AUTO_INCREMENT,
  date_begin timestamp NOT NULL,
  date_end timestamp NOT NULL,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  id_agenda int NOT NULL,
  PRIMARY KEY (id_event),
  KEY id_agenda (id_agenda),
  CONSTRAINT events_ibfk_1 FOREIGN KEY (id_agenda) REFERENCES agenda (id_agenda) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS users (
  id_user int NOT NULL AUTO_INCREMENT,
  login varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  PRIMARY KEY (id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
