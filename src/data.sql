STAP 1

---------------------------------

CREATE database joggingDb default character set utf8 default collate utf8_general_ci

---------------------------------

STAP 2

---------------------------------

create table race (  
    raceId int not null primary key auto_increment,
    raceName varchar(128) not null 
)

CREATE TABLE `runner` (
  `startNumber` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `gender` varchar(1) not NULL,
  `finish` time DEFAULT NULL,
  `race_id` int(11) NOT NULL,
  `ranking` int(11) DEFAULT NULL,
  PRIMARY KEY (`startNumber`, `race_id`),
  KEY `runner_ibfk_1` (`race_id`),
  CONSTRAINT `runner_ibfk_1` FOREIGN KEY (`race_id`) REFERENCES `race` (`raceId`) ON DELETE CASCADE ON UPDATE CASCADE
)

---------------------------------

STAP 3

---------------------------------

insert into race (raceName) values ("2010");
insert into race (raceName) values ("2011");
insert into race (raceName) values ("2012");

insert into runner (startNumber, name, gender, race_id) values (1, "Pom", 'M', 1);
insert into runner (startNumber, name, gender, race_id) values (2, "Pam", 'V', 1);
insert into runner (startNumber, name, gender, race_id) values (3, "Pim", 'M', 1);

insert into runner (startNumber, name, gender, race_id) values (4, "Tom", 'M', 2);
insert into runner (startNumber, name, gender, race_id) values (5, "Tam", 'V', 2);
insert into runner (startNumber, name, gender, race_id) values (6, "Tim", 'M', 2);

insert into runner (startNumber, name, gender, race_id) values (7, "Hee", 'V', 3);
insert into runner (startNumber, name, gender, race_id) values (8, "Jij", 'V', 3);

---------------------------------