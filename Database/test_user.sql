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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `Emailid` varchar(45) NOT NULL,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) DEFAULT NULL,
  `Tel` varchar(20) NOT NULL,
  `Pword` char(250) NOT NULL,
  `role` varchar(45) NOT NULL,
  `userid` int(11) NOT NULL,
  `stafftype` varchar(45) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `Emailid_UNIQUE` (`Emailid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin@gmail.com','Admin','Cambridge Care Services','9945215941','21232f297a57a5a743894a0e4a801fc3','admin',2,'','2019-09-30 12:56:29','2038-01-18 18:30:00'),('nandakumarvn01@gmail.com','Nanda','Kumar','9945215941','912ec803b2ce49e4a541068d495ab570','staff',3,'Doctor','2019-10-29 13:17:27','2038-01-19 00:00:00'),('nandavn@yahoo.com','nanda','kumar','9945215941','912ec803b2ce49e4a541068d495ab570','staff',4,'Nurse','2019-10-29 12:41:17','2038-01-19 00:00:00'),('kkakka@gmail.com',' nnaa','kkk',' 9945215941','912ec803b2ce49e4a541068d495ab570','staff',5,'Nurse','2019-10-29 12:41:18','2038-01-19 00:00:00'),('unknown@gmail.com','unknown','kk','9945215941','912ec803b2ce49e4a541068d495ab570','staff',6,'Doctor','2019-10-29 12:41:18','2038-01-19 00:00:00'),('harishram3@gmail.com','harish','ram','9945215941','912ec803b2ce49e4a541068d495ab570','staff',7,'Doctor','2019-10-30 09:05:55','2038-01-19 00:00:00'),('ajaymr2345@gmail.com','Ajay','Ram',' 9945215941','912ec803b2ce49e4a541068d495ab570','staff',8,'Doctor','2019-10-30 09:05:57','2038-01-19 00:00:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-31 10:53:59
