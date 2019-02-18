CREATE database joggingDb default character set utf8 default collate utf8_general_ci

create table race (  
    raceId int not null primary key auto_increment,
    raceName varchar(128) not null 
)

CREATE TABLE `runner` (
  `runnerId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `gender` varchar(1) not NULL,
  `finish` time DEFAULT NULL,
  `race_id` int(11) NOT NULL,
  PRIMARY KEY (`runnerId`),
  KEY `fk_race` (`race_id`),
  CONSTRAINT `runner_ibfk_1` FOREIGN KEY (`race_id`) REFERENCES `race` (`raceId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;


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
