-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: soulplanelocal
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Airports` (
  `airport_id` int NOT NULL AUTO_INCREMENT,
  `airport_name` varchar(255) NOT NULL,
  `airport_code` varchar(3) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`airport_id`),
  UNIQUE KEY `airport_code` (`airport_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Airports`
--

LOCK TABLES `Airports` WRITE;
/*!40000 ALTER TABLE `Airports` DISABLE KEYS */;
INSERT INTO `Airports` VALUES (1,'Portland International Airport','PDX','Portland, OR'),(2,'Seattle-Tacoma International Airport','SEA','SeaTac, WA'),(3,'Spokane International Airport','GEG','Spokane, WA');
/*!40000 ALTER TABLE `Airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnostic`
--

DROP TABLE IF EXISTS `diagnostic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnostic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostic`
--

LOCK TABLES `diagnostic` WRITE;
/*!40000 ALTER TABLE `diagnostic` DISABLE KEYS */;
INSERT INTO `diagnostic` VALUES (1,'MySQL is working!');
/*!40000 ALTER TABLE `diagnostic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flights`
--

DROP TABLE IF EXISTS `Flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flights` (
  `flight_id` int NOT NULL AUTO_INCREMENT,
  `plane_id` int NOT NULL,
  `depart_airport_id` int NOT NULL,
  `arrive_airport_id` int NOT NULL,
  `depart_time` datetime NOT NULL,
  `arrive_time` datetime NOT NULL,
  PRIMARY KEY (`flight_id`),
  KEY `plane_id` (`plane_id`),
  KEY `depart_airport_id` (`depart_airport_id`),
  KEY `arrive_airport_id` (`arrive_airport_id`),
  CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`plane_id`) REFERENCES `Planes` (`plane_id`),
  CONSTRAINT `flights_ibfk_2` FOREIGN KEY (`depart_airport_id`) REFERENCES `Airports` (`airport_id`) ON DELETE CASCADE,
  CONSTRAINT `flights_ibfk_3` FOREIGN KEY (`arrive_airport_id`) REFERENCES `Airports` (`airport_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `Passenger_Flights`
--

DROP TABLE IF EXISTS `Passenger_Flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Passenger_Flights` (
  `passenger_id` int NOT NULL,
  `flight_id` int NOT NULL,
  PRIMARY KEY (`passenger_id`,`flight_id`),
  KEY `flight_id` (`flight_id`),
  CONSTRAINT `passenger_flights_ibfk_1` FOREIGN KEY (`passenger_id`) REFERENCES `Passengers` (`passenger_id`) ON DELETE CASCADE,
  CONSTRAINT `passenger_flights_ibfk_2` FOREIGN KEY (`flight_id`) REFERENCES `Flights` (`flight_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Passenger_Flights`
--

LOCK TABLES `Passenger_Flights` WRITE;
/*!40000 ALTER TABLE `Passenger_Flights` DISABLE KEYS */;
INSERT INTO `Passenger_Flights` VALUES (3,1),(1,2),(2,3);
/*!40000 ALTER TABLE `Passenger_Flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Passengers`
--

DROP TABLE IF EXISTS `Passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Passengers` (
  `passenger_id` int NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `Plane_Types`
--

DROP TABLE IF EXISTS `Plane_Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Plane_Types` (
  `plane_type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  `range_in_hrs` int NOT NULL,
  PRIMARY KEY (`plane_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Plane_Types`
--

LOCK TABLES `Plane_Types` WRITE;
/*!40000 ALTER TABLE `Plane_Types` DISABLE KEYS */;
INSERT INTO `Plane_Types` VALUES (1,'Airbus A320-200',180,5),(2,'Boeing B737-800',190,5),(3,'Embraer 135',37,3);
/*!40000 ALTER TABLE `Plane_Types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Planes`
--

DROP TABLE IF EXISTS `Planes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Planes` (
  `plane_id` int NOT NULL AUTO_INCREMENT,
  `plane_type_id` int NOT NULL,
  `current_airport_id` int DEFAULT NULL,
  PRIMARY KEY (`plane_id`),
  KEY `plane_type_id` (`plane_type_id`),
  KEY `current_airport_id` (`current_airport_id`),
  CONSTRAINT `planes_ibfk_1` FOREIGN KEY (`plane_type_id`) REFERENCES `Plane_Types` (`plane_type_id`) ON DELETE RESTRICT,
  CONSTRAINT `planes_ibfk_2` FOREIGN KEY (`current_airport_id`) REFERENCES `Airports` (`airport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2024-03-16 11:58:51
