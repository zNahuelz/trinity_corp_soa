-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2023 at 05:43 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trinity_corp_soa`
--

-- --------------------------------------------------------

--
-- Table structure for table `linea`
--

CREATE TABLE `linea` (
  `id_linea` int(11) NOT NULL,
  `nombre` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `linea`
--

INSERT INTO `linea` (`id_linea`, `nombre`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C');

-- --------------------------------------------------------

--
-- Table structure for table `sede`
--

CREATE TABLE `sede` (
  `id_sede` int(11) NOT NULL,
  `ciudad` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sede`
--

INSERT INTO `sede` (`id_sede`, `ciudad`) VALUES
(1, 'PIURA'),
(2, 'AREQUIPA'),
(3, 'LIMA');

-- --------------------------------------------------------

--
-- Table structure for table `sede_linea`
--

CREATE TABLE `sede_linea` (
  `id_sede` int(11) NOT NULL,
  `id_linea` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_registro` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sede_linea`
--

INSERT INTO `sede_linea` (`id_sede`, `id_linea`, `cantidad`, `fecha_registro`) VALUES
(1, 1, 300, '2023-08-12'),
(1, 2, 100, '2023-08-12'),
(1, 3, 50, '2023-08-12'),
(2, 1, 130, '2023-08-11'),
(2, 2, 250, '2023-08-11'),
(2, 3, 400, '2023-08-11'),
(3, 1, 500, '2023-08-10'),
(3, 2, 500, '2023-08-10'),
(3, 3, 500, '2023-08-10'),
(3, 1, 100, '2023-08-13'),
(3, 2, 100, '2023-08-13'),
(3, 3, 120, '2023-08-13'),
(2, 1, 100, '2023-08-09'),
(2, 2, 230, '2023-08-09'),
(2, 3, 40, '2023-08-09'),
(1, 1, 1, '2023-08-13'),
(1, 2, 1, '2023-08-13'),
(1, 3, 1, '2023-08-13'),
(1, 1, 5, '2023-08-14'),
(1, 2, 5, '2023-08-14'),
(1, 3, 5, '2023-08-14');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `paterno` varchar(20) NOT NULL,
  `materno` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `contrasena` varchar(20) NOT NULL,
  `activo` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `paterno`, `materno`, `email`, `usuario`, `contrasena`, `activo`) VALUES
(1, 'CARLOS', 'VILLANUEVA', 'TOVAR', 'CARLVILLA@GMAIL.COM', 'CARVILLA01', 'lima12345', b'0'),
(2, 'LUIS', 'IGNACIO', 'VILLENA', 'LUISVII@HOTMAIL.COM', 'LUIS_30', '12345', b'0'),
(3, 'MARTIN', 'JIMENEZ', 'KIRCHNER', 'JIMEKIR@GMAIL.COM', 'MARTINJ', 'admin', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `usuario_sede`
--

CREATE TABLE `usuario_sede` (
  `id_sede` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario_sede`
--

INSERT INTO `usuario_sede` (`id_sede`, `id_usuario`) VALUES
(1, 1),
(2, 2),
(3, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `linea`
--
ALTER TABLE `linea`
  ADD PRIMARY KEY (`id_linea`);

--
-- Indexes for table `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`id_sede`);

--
-- Indexes for table `sede_linea`
--
ALTER TABLE `sede_linea`
  ADD KEY `FK_ID_SEDE_2` (`id_sede`),
  ADD KEY `FK_ID_LINEA` (`id_linea`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indexes for table `usuario_sede`
--
ALTER TABLE `usuario_sede`
  ADD KEY `FK_ID_SEDE` (`id_sede`),
  ADD KEY `FK_ID_USUARIO` (`id_usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `linea`
--
ALTER TABLE `linea`
  MODIFY `id_linea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sede`
--
ALTER TABLE `sede`
  MODIFY `id_sede` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sede_linea`
--
ALTER TABLE `sede_linea`
  ADD CONSTRAINT `FK_SL_LINEA` FOREIGN KEY (`id_linea`) REFERENCES `linea` (`id_linea`),
  ADD CONSTRAINT `FK_SL_SEDE` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`);

--
-- Constraints for table `usuario_sede`
--
ALTER TABLE `usuario_sede`
  ADD CONSTRAINT `FK_US_SEDE` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`),
  ADD CONSTRAINT `FK_US_U` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
