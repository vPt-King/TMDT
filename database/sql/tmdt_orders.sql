-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: tmdt
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `place` varchar(500) DEFAULT NULL,
  `id_shipment` int DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `total_sum` int DEFAULT NULL,
  `id_status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,4,'Vũ Phương Thanh','0859490555','Hà Nội',1,'14/06/2024',915000,1),(2,4,'Vũ Phương Thanh','0859490555','Hà Nội',1,'14/06/2024',915000,1),(3,4,'thanh','0859490555','Hà Nội',1,'13/02/2024',20000,1),(4,4,'Vũ Phương Thanh 2','0859490555','Hà Nội',1,'14/06/2024',915000,1),(5,4,'Vũ Phương Thanh 3','0859490555','Hà Nội',1,'14/06/2024',915000,1),(6,4,'Vũ Phương Thanh 4','0859490555','Hà Nội',1,'14/06/2024',915000,1),(7,4,'Vũ Phương Thanh 5','0859490555','Hà Nội',1,'14/06/2024',915000,1),(8,4,'Vũ Phương Thanh 7','0859490555','Hà Nội',2,'14/06/2024',915000,1),(9,4,'Vũ Phương Thanh 8','0859490555','Hà Nội',1,'14/06/2024',915000,1),(10,4,'Vũ Phương Thanh 10','0859490555','Hà Nội',1,'14/06/2024',915000,1),(11,4,'Vũ Phương Thanh 11','0859490555','Hà Nội',1,'14/06/2024',915000,1),(12,4,'Tạ Việt Anh','0948519358','Hà Nội',2,'15/06/2024',1035000,1),(13,4,'anh','0123456789','Hà Đông, Hà Nội',2,'15/06/2024',2052000,1),(14,4,'anh 1','0123456789','Hà Đông, Hà Nội',2,'15/06/2024',861000,4),(15,5,'nam','131223123123','Hà Nội',2,'15/06/2024',1138000,1),(16,4,'viet anh','123123','Hà Nội',2,'15/06/2024',6225000,1),(17,5,'nnam','1231231311','Hà Nội',1,'15/06/2024',570000,1),(18,5,'','','',2,'15/06/2024',1902000,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-15 16:08:26
