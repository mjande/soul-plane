-- MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_andemat4
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Airports`
--

DROP TABLE IF EXISTS `Airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Airports` (
  `airport_id` int(11) NOT NULL AUTO_INCREMENT,
  `airport_name` varchar(255) NOT NULL,
  `airport_code` varchar(3) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`airport_id`),
  UNIQUE KEY `airport_code` (`airport_code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Airports`
--

LOCK TABLES `Airports` WRITE;
/*!40000 ALTER TABLE `Airports` DISABLE KEYS */;
INSERT INTO `Airports` VALUES (1,'Portland International Airport','PDX','Portland, OR'),(2,'Seattle-Tacoma International Airport','SEA','SeaTac, WA'),(3,'Spokane International Airport','GEG','Spokane, WA'),(6,'Dallas Love Field','DAL','Dallas, TX');
/*!40000 ALTER TABLE `Airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flights`
--

DROP TABLE IF EXISTS `Flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Flights` (
  `flight_id` int(11) NOT NULL AUTO_INCREMENT,
  `plane_id` int(11) NOT NULL,
  `depart_airport_id` int(11) NOT NULL,
  `arrive_airport_id` int(11) NOT NULL,
  `depart_time` datetime NOT NULL,
  `arrive_time` datetime NOT NULL,
  PRIMARY KEY (`flight_id`),
  KEY `plane_id` (`plane_id`),
  KEY `depart_airport_id` (`depart_airport_id`),
  KEY `arrive_airport_id` (`arrive_airport_id`),
  CONSTRAINT `Flights_ibfk_1` FOREIGN KEY (`plane_id`) REFERENCES `Planes` (`plane_id`),
  CONSTRAINT `Flights_ibfk_2` FOREIGN KEY (`depart_airport_id`) REFERENCES `Airports` (`airport_id`) ON DELETE CASCADE,
  CONSTRAINT `Flights_ibfk_3` FOREIGN KEY (`arrive_airport_id`) REFERENCES `Airports` (`airport_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flights`
--

LOCK TABLES `Flights` WRITE;
/*!40000 ALTER TABLE `Flights` DISABLE KEYS */;
INSERT INTO `Flights` VALUES (1,3,1,2,'2024-02-05 14:30:00','2024-02-11 02:15:00'),(2,1,2,3,'2024-03-12 18:15:00','2024-04-02 12:30:00'),(3,2,3,1,'2024-04-20 09:45:00','2024-05-22 11:15:00');
/*!40000 ALTER TABLE `Flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Passengers`
--

DROP TABLE IF EXISTS `Passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Passengers` (
  `passenger_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state_abbr` varchar(2) NOT NULL,
  `zip_code` varchar(9) NOT NULL,
  `passport_number` varchar(20) NOT NULL,
  PRIMARY KEY (`passenger_id`),
  UNIQUE KEY `passport_number` (`passport_number`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Passengers`
--

LOCK TABLES `Passengers` WRITE;
/*!40000 ALTER TABLE `Passengers` DISABLE KEYS */;
INSERT INTO `Passengers` VALUES (1,'Paul','Nguyen','111-222-3333','paul@oregonstate.edu','1111 Oregon St','Corvallis','OR','97330','A11222333'),(2,'Matt','Anderson','222-333-4444','matt@oregonstate.edu','B222 Washington St','Spokane','WA','99201','222333444'),(3,'Steve','Rogers','832-424-8060','steve@marvel.com','14520 Walt St','Orlando','FL','32789','C334445555');
/*!40000 ALTER TABLE `Passengers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Passengers_flights`
--

DROP TABLE IF EXISTS `Passengers_flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Passengers_flights` (
  `passenger_id` int(11) NOT NULL,
  `flight_id` int(11) NOT NULL,
  PRIMARY KEY (`passenger_id`,`flight_id`),
  KEY `flight_id` (`flight_id`),
  CONSTRAINT `Passengers_flights_ibfk_1` FOREIGN KEY (`passenger_id`) REFERENCES `Passengers` (`passenger_id`) ON DELETE CASCADE,
  CONSTRAINT `Passengers_flights_ibfk_2` FOREIGN KEY (`flight_id`) REFERENCES `Flights` (`flight_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Passengers_flights`
--

LOCK TABLES `Passengers_flights` WRITE;
/*!40000 ALTER TABLE `Passengers_flights` DISABLE KEYS */;
INSERT INTO `Passengers_flights` VALUES (1,2),(2,3),(3,1);
/*!40000 ALTER TABLE `Passengers_flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Plane_types`
--

DROP TABLE IF EXISTS `Plane_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Plane_types` (
  `plane_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `range_in_hrs` int(11) NOT NULL,
  PRIMARY KEY (`plane_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Plane_types`
--

LOCK TABLES `Plane_types` WRITE;
/*!40000 ALTER TABLE `Plane_types` DISABLE KEYS */;
INSERT INTO `Plane_types` VALUES (1,'Airbus A320-200',180,5),(2,'Boeing B737-800',190,5),(3,'Embraer 135',37,3);
/*!40000 ALTER TABLE `Plane_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Planes`
--

DROP TABLE IF EXISTS `Planes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Planes` (
  `plane_id` int(11) NOT NULL AUTO_INCREMENT,
  `plane_type_id` int(11) NOT NULL,
  `current_airport_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`plane_id`),
  KEY `plane_type_id` (`plane_type_id`),
  KEY `current_airport_id` (`current_airport_id`),
  CONSTRAINT `Planes_ibfk_1` FOREIGN KEY (`plane_type_id`) REFERENCES `Plane_types` (`plane_type_id`),
  CONSTRAINT `Planes_ibfk_2` FOREIGN KEY (`current_airport_id`) REFERENCES `Airports` (`airport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Planes`
--

LOCK TABLES `Planes` WRITE;
/*!40000 ALTER TABLE `Planes` DISABLE KEYS */;
INSERT INTO `Planes` VALUES (1,2,2),(2,1,3),(3,3,1),(4,3,NULL);
/*!40000 ALTER TABLE `Planes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-02 13:36:11
