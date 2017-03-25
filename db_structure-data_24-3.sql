-- MySQL dump 10.13  Distrib 5.6.24, for osx10.8 (x86_64)
--
-- Host: localhost    Database: ALERTAS_TEST
-- ------------------------------------------------------
-- Server version	5.6.25

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
-- Table structure for table `bebida`
--

DROP TABLE IF EXISTS `bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bebida` (
  `idbebida` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` varchar(45) NOT NULL,
  `categoria` int(11) NOT NULL,
  PRIMARY KEY (`idbebida`,`nombre`),
  KEY `categoria_bebida_idx` (`categoria`),
  CONSTRAINT `bebdida-categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria_bebida` (`idcategoria_bebida`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bebida`
--

LOCK TABLES `bebida` WRITE;
/*!40000 ALTER TABLE `bebida` DISABLE KEYS */;
INSERT INTO `bebida` VALUES (11,'Caña','1.8',16),(12,'Doble','2',16),(13,'Clara','1.8',16),(14,'Clara G','2',16),(15,'Carlsberg','2.5',16),(16,'T. Alhambra','1.9',16),(17,'Importación','2.5',16),(18,'Coca-Cola','1.8',17),(19,'Fanta Naranja','1.8',17),(20,'Fanta Limon','1.8',17),(21,'Gaseosa','1.8',17),(22,'Agua gas','1.8',17),(23,'Agua P','1.8',17),(24,'Agua G','2',17),(25,'Café','1.5',18),(26,'Café leche','1.5',18),(27,'Cortado','1.5',18),(28,'Bombón','1.5',18),(29,'Carajillo','2',18),(30,'Infusión','1.5',18),(31,'Viña Pomal','15',20),(32,'Ramon Bilbao','16',20),(33,'M. Concordia C','15',20),(34,'M. Concordia R','20',20),(35,'Muga','21',20),(36,'Legaris','15',20),(37,'Pago Capellanes RO','18',20),(38,'Lopez Cristobal','21',20),(39,'Cepas Viejas','21',20),(40,'Pesquera','25',20),(41,'Pago Capellanes C','26',20),(42,'BO','15',20),(43,'MalaVida','14',20),(44,'Venta Puerto','16',20),(45,'Alcusses','15',20),(46,'Ladrón Lunas','21',20),(47,'Madureza','25',20),(48,'Santa Rosa','28',20),(49,'Marina Alta','12',21),(50,'Marina Alta Espumante','12',21),(51,'Gregal','13',21),(52,'Viñas del Vero','13.50',21),(53,'Vega Reina','12',21),(54,'Enrique Mendoza','14',21),(55,'Barbadillo','14',21),(56,'Cullerot','14',21),(57,'Mar de Frades','18',21),(58,'Lambrusco','8',23),(59,'Marina Alta Espumoso','10',23),(60,'Nuviana','10',23),(61,'Rosa Rosae','12',23),(62,'Jarra','7',16),(63,'Sin Alcohol','1.9',16);
/*!40000 ALTER TABLE `bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bebida_mesa`
--

DROP TABLE IF EXISTS `bebida_mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bebida_mesa` (
  `idmesa` int(11) NOT NULL,
  `idbebida` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`idmesa`,`idbebida`),
  KEY `lista_mesa_idx` (`idbebida`),
  CONSTRAINT `lista_bebida` FOREIGN KEY (`idbebida`) REFERENCES `bebida` (`idbebida`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `lista_mesa` FOREIGN KEY (`idmesa`) REFERENCES `mesa` (`idmesa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bebida_mesa`
--

LOCK TABLES `bebida_mesa` WRITE;
/*!40000 ALTER TABLE `bebida_mesa` DISABLE KEYS */;
/*!40000 ALTER TABLE `bebida_mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_bebida`
--

DROP TABLE IF EXISTS `categoria_bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria_bebida` (
  `idcategoria_bebida` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(45) NOT NULL,
  PRIMARY KEY (`idcategoria_bebida`,`nombre_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_bebida`
--

LOCK TABLES `categoria_bebida` WRITE;
/*!40000 ALTER TABLE `categoria_bebida` DISABLE KEYS */;
INSERT INTO `categoria_bebida` VALUES (16,'Cervezas'),(17,'Refrescos'),(18,'Cafés'),(19,'Otros'),(20,'Vinos Tintos'),(21,'Vinos Blancos'),(22,'Cavas'),(23,'Vinos Rosados'),(24,'testbebidacategoria');
/*!40000 ALTER TABLE `categoria_bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_plato`
--

DROP TABLE IF EXISTS `categoria_plato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria_plato` (
  `idcategoria_plato` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(45) NOT NULL,
  PRIMARY KEY (`idcategoria_plato`,`nombre_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_plato`
--

LOCK TABLES `categoria_plato` WRITE;
/*!40000 ALTER TABLE `categoria_plato` DISABLE KEYS */;
INSERT INTO `categoria_plato` VALUES (1,'testcategoriaplato'),(2,'Entrantes'),(3,'Ensaladas'),(4,'Carnes'),(5,'Pescados'),(6,'Pastas'),(7,'Postres'),(8,'Otros');
/*!40000 ALTER TABLE `categoria_plato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_zona`
--

DROP TABLE IF EXISTS `categoria_zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria_zona` (
  `idcategoria_zona` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_zona` varchar(45) NOT NULL,
  PRIMARY KEY (`idcategoria_zona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_zona`
--

LOCK TABLES `categoria_zona` WRITE;
/*!40000 ALTER TABLE `categoria_zona` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_zona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesa`
--

DROP TABLE IF EXISTS `mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mesa` (
  `idmesa` int(11) NOT NULL AUTO_INCREMENT,
  `referencia` varchar(45) NOT NULL,
  `pax` varchar(45) DEFAULT NULL,
  `estado` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`idmesa`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesa`
--

LOCK TABLES `mesa` WRITE;
/*!40000 ALTER TABLE `mesa` DISABLE KEYS */;
INSERT INTO `mesa` VALUES (11,'S1',NULL,''),(12,'S2',NULL,'\0'),(13,'S3',NULL,'\0'),(14,'S4',NULL,'\0'),(15,'S5',NULL,'\0'),(16,'S6',NULL,'\0'),(17,'M1',NULL,'\0'),(18,'M2',NULL,'\0'),(19,'M3',NULL,'\0'),(20,'M4',NULL,'\0'),(21,'M5',NULL,'\0'),(22,'M6',NULL,'\0'),(23,'M7',NULL,'\0'),(24,'M8',NULL,'\0'),(25,'M9',NULL,'\0'),(26,'M10',NULL,'\0');
/*!40000 ALTER TABLE `mesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesa_turno`
--

DROP TABLE IF EXISTS `mesa_turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mesa_turno` (
  `idmesa_turno` int(11) NOT NULL AUTO_INCREMENT,
  `idmesa` int(11) NOT NULL,
  `tipopago` varchar(45) NOT NULL,
  `cantidad` varchar(45) NOT NULL,
  PRIMARY KEY (`idmesa_turno`),
  KEY `mesa-mesa_turno_idx` (`idmesa`),
  CONSTRAINT `mesa-mesa_turno` FOREIGN KEY (`idmesa`) REFERENCES `mesa` (`idmesa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesa_turno`
--

LOCK TABLES `mesa_turno` WRITE;
/*!40000 ALTER TABLE `mesa_turno` DISABLE KEYS */;
/*!40000 ALTER TABLE `mesa_turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal`
--

DROP TABLE IF EXISTS `personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal` (
  `idpersonal` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Zona` int(11) NOT NULL,
  `Cargo` varchar(45) NOT NULL,
  PRIMARY KEY (`idpersonal`),
  KEY `personal_categoria_zona_idx` (`Zona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal`
--

LOCK TABLES `personal` WRITE;
/*!40000 ALTER TABLE `personal` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_horas`
--

DROP TABLE IF EXISTS `personal_horas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_horas` (
  `idpersonal` int(11) NOT NULL,
  `dia_mes` varchar(150) NOT NULL,
  `horas` float NOT NULL,
  KEY `personal-personal_horas_idx` (`idpersonal`),
  CONSTRAINT `personal-personal_horas` FOREIGN KEY (`idpersonal`) REFERENCES `personal` (`idpersonal`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_horas`
--

LOCK TABLES `personal_horas` WRITE;
/*!40000 ALTER TABLE `personal_horas` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_horas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_turnos`
--

DROP TABLE IF EXISTS `personal_turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_turnos` (
  `idpersonal` int(11) NOT NULL,
  `fecha_entrada` datetime NOT NULL,
  `fecha_salida` datetime DEFAULT NULL,
  `estado` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`fecha_entrada`,`idpersonal`),
  KEY `personal_personal_turnos_idx` (`idpersonal`),
  CONSTRAINT `personal-personal_turnos` FOREIGN KEY (`idpersonal`) REFERENCES `personal` (`idpersonal`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_turnos`
--

LOCK TABLES `personal_turnos` WRITE;
/*!40000 ALTER TABLE `personal_turnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plato`
--

DROP TABLE IF EXISTS `plato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plato` (
  `idplato` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` varchar(45) NOT NULL,
  `categoria` int(11) NOT NULL,
  PRIMARY KEY (`idplato`,`nombre`),
  KEY `categoria_bebida_idx` (`categoria`),
  CONSTRAINT `plato-categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria_plato` (`idcategoria_plato`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plato`
--

LOCK TABLES `plato` WRITE;
/*!40000 ALTER TABLE `plato` DISABLE KEYS */;
INSERT INTO `plato` VALUES (1,'testplato','99',1),(2,'Pulpo','7.5',2);
/*!40000 ALTER TABLE `plato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plato_mesa`
--

DROP TABLE IF EXISTS `plato_mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plato_mesa` (
  `idmesa` int(11) NOT NULL,
  `idplato` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estado` bit(1) DEFAULT NULL,
  PRIMARY KEY (`idmesa`,`idplato`),
  KEY `lista_mesa_idx` (`idplato`),
  CONSTRAINT `mesa-plato_mesa` FOREIGN KEY (`idmesa`) REFERENCES `mesa` (`idmesa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `plato-plato_mesa` FOREIGN KEY (`idplato`) REFERENCES `plato` (`idplato`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plato_mesa`
--

LOCK TABLES `plato_mesa` WRITE;
/*!40000 ALTER TABLE `plato_mesa` DISABLE KEYS */;
/*!40000 ALTER TABLE `plato_mesa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-24 18:37:42
