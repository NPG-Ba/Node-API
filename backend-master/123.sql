-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: database_development1
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `comment` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES (1,'A',25,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(2,'B',26,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(3,'N',27,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(4,'P',28,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(5,'M',29,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(6,'V',30,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(7,'B',31,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(8,'C',32,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(9,'R',33,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(10,'T',34,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(11,'D',35,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(12,'X',36,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(13,'T',37,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(14,'R',38,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(15,'Q',39,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(16,'W',40,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(17,'Z',41,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(18,'M',42,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(19,'K',43,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(20,'L',44,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(21,'P',45,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00'),(22,'O',46,'xxxxxxxx','2019-01-01 00:00:00','2019-01-01 00:00:00');
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20190109054612-create-person.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-09 17:31:21
