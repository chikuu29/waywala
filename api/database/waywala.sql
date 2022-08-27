-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2022 at 07:39 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `waywala`
--

-- --------------------------------------------------------

--
-- Table structure for table `login_info`
--

CREATE TABLE `login_info` (
  `r_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile_no` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `ip_addres` varchar(100) DEFAULT NULL,
  `time` time DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_info`
--

INSERT INTO `login_info` (`r_id`, `email`, `mobile_no`, `password`, `ip_addres`, `time`) VALUES
(1, 'chiku@gnail.com', '7205569189', '8d844c07966e06059d4d0d327c1ae5dd', NULL, '22:52:52'),
(2, 'gyana@gnail.com', '720559189', '8d844c07966e06059d4d0d327c1ae5dd', NULL, '22:53:59'),
(3, 'gyna@gnail.com', '72559189', '8d844c07966e06059d4d0d327c1ae5dd', NULL, '22:56:58');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile_no` varchar(45) NOT NULL,
  `email_otp` varchar(45) NOT NULL,
  `mobile_otp` varchar(45) NOT NULL,
  `status` bit(1) NOT NULL DEFAULT b'0',
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  `password` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `mobile_no`, `email_otp`, `mobile_otp`, `status`, `timestamp`, `password`) VALUES
(1, 'chuku', 'chiku@gnail.com', '7205569189', '7588', '5952', b'0', '2022-08-27 17:22:52', '8d844c07966e06059d4d0d327c1ae5dd'),
(2, 'gayaa', 'gyana@gnail.com', '720559189', '8371', '4913', b'0', '2022-08-27 17:23:59', '8d844c07966e06059d4d0d327c1ae5dd'),
(3, 'gayaa', 'gyna@gnail.com', '72559189', '851937', '111017', b'0', '2022-08-27 17:26:58', '8d844c07966e06059d4d0d327c1ae5dd');

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `user_AFTER_INSERT` AFTER INSERT ON `user` FOR EACH ROW BEGIN
    INSERT into login_info (r_id , email ,password,mobile_no) values (new.id , new.email ,new.password,new.mobile_no);
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login_info`
--
ALTER TABLE `login_info`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `r_id_UNIQUE` (`r_id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `mobile_no_UNIQUE` (`mobile_no`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_no_UNIQUE` (`mobile_no`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
