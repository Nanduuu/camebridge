-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	5.6.24-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `jobid` int(11) NOT NULL,
  `worker` varchar(45) NOT NULL,
  `client` varchar(45) NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `count` int(10) NOT NULL,
  `filled` int(10) NOT NULL DEFAULT '0',
  `active` char(1) DEFAULT 'Y',
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `shift_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`jobid`),
  UNIQUE KEY `jobid_UNIQUE` (`jobid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Nurse','voyage care','2019-11-30 09:05:24',1,5,0,'Y','2019-11-30 07:00:00','2019-11-30 14:00:00','Early'),(2,'Doctor','voyage care','2019-12-24 08:35:23',1,5,1,'Y','2019-12-24 07:00:00','2019-12-24 14:00:00','Early'),(3,'Doctor','voyage care','2019-12-30 10:44:48',1,2,1,'Y','2019-12-30 07:00:00','2019-12-30 14:00:00','Early'),(4,'Doctor','voyage care','2019-12-30 13:50:18',1,2,0,'Y','2019-12-30 07:00:00','2019-12-30 14:00:00','Early'),(5,'Doctor','voyage care','2019-12-27 13:57:29',1,3,0,'Y','2019-12-27 07:00:00','2019-12-27 14:00:00','Early'),(6,'Doctor','voyage care','2019-12-27 14:04:50',1,3,0,'Y','2019-12-27 07:00:00','2019-12-27 14:00:00','Early'),(7,'Doctor','voyage care','2019-12-28 14:06:00',1,4,0,'Y','2019-12-28 07:00:00','2019-12-28 14:00:00','Early');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-31 10:53:57
