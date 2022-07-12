-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-07-2022 a las 04:58:50
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clinica_dialisis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `balance`
--

CREATE TABLE `balance` (
  `id_balance` int(5) NOT NULL,
  `id_paciente` varchar(30) NOT NULL,
  `id_sistema` int(5) NOT NULL,
  `fecha` varchar(30) NOT NULL,
  `presion` varchar(10) DEFAULT NULL,
  `concentracion1` varchar(10) NOT NULL,
  `concentracion2` varchar(10) NOT NULL,
  `concentracion3` varchar(10) NOT NULL,
  `concentracion4` varchar(10) NOT NULL,
  `infusion1` int(10) NOT NULL,
  `infusion2` int(10) NOT NULL,
  `infusion3` int(10) NOT NULL,
  `infusion4` int(10) NOT NULL,
  `total_infusion` int(10) NOT NULL,
  `drenaje1` int(10) NOT NULL,
  `drenaje2` int(10) NOT NULL,
  `drenaje3` int(10) NOT NULL,
  `drenaje4` int(10) NOT NULL,
  `total_drenaje` int(10) NOT NULL,
  `cualidad1` varchar(30) NOT NULL,
  `cualidad2` varchar(30) NOT NULL,
  `cualidad3` varchar(30) NOT NULL,
  `cualidad4` varchar(30) NOT NULL,
  `total_balance1` int(10) NOT NULL,
  `total_balance2` int(10) NOT NULL,
  `total_balance3` int(10) NOT NULL,
  `total_balance4` int(10) NOT NULL,
  `total_balance_final` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` varchar(30) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sistema`
--

CREATE TABLE `sistema` (
  `id_sistema` int(5) NOT NULL,
  `descripcion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sistema`
--

INSERT INTO `sistema` (`id_sistema`, `descripcion`) VALUES
(1, 'Baxter'),
(2, 'Fresenius Medical Care');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tablacitas`
--

CREATE TABLE `tablacitas` (
  `id_cita` int(11) NOT NULL,
  `cedula` varchar(30) NOT NULL,
  `especialidad` varchar(50) NOT NULL,
  `medico` varchar(50) NOT NULL,
  `motivo` varchar(100) NOT NULL,
  `otro` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_usuario` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_usuario`, `user`, `password`) VALUES
(1, 'USUARIO_MD', 'enfermeriadp'),
(2, 'USUARIO_PD', 'pacientedp');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `balance`
--
ALTER TABLE `balance`
  ADD PRIMARY KEY (`id_balance`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_sistema` (`id_sistema`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`);

--
-- Indices de la tabla `sistema`
--
ALTER TABLE `sistema`
  ADD PRIMARY KEY (`id_sistema`);

--
-- Indices de la tabla `tablacitas`
--
ALTER TABLE `tablacitas`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `cedula` (`cedula`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `balance`
--
ALTER TABLE `balance`
  MODIFY `id_balance` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `sistema`
--
ALTER TABLE `sistema`
  MODIFY `id_sistema` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tablacitas`
--
ALTER TABLE `tablacitas`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `balance`
--
ALTER TABLE `balance`
  ADD CONSTRAINT `balance_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `balance_ibfk_2` FOREIGN KEY (`id_sistema`) REFERENCES `sistema` (`id_sistema`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tablacitas`
--
ALTER TABLE `tablacitas`
  ADD CONSTRAINT `tablacitas_ibfk_1` FOREIGN KEY (`cedula`) REFERENCES `pacientes` (`id_paciente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
