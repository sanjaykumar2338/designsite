-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 14, 2024 at 10:20 AM
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
-- Database: `smoothservice`
--

-- --------------------------------------------------------

--
-- Table structure for table `intakeforms`
--

CREATE TABLE `intakeforms` (
  `id` int(11) NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `form_name` varchar(255) NOT NULL,
  `form_fields` text NOT NULL,
  `checkmark` varchar(1) DEFAULT '0',
  `onboarding` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `intakeforms`
--

INSERT INTO `intakeforms` (`id`, `user_id`, `form_name`, `form_fields`, `checkmark`, `onboarding`, `created_at`, `updated_at`) VALUES
(7, 1, 'My First Form', '[{\"type\":\"text\",\"required\":false,\"label\":\"Order Title\",\"className\":\"form-control\",\"name\":\"text-1723621863098-0\",\"access\":false,\"subtype\":\"text\"},{\"type\":\"textarea\",\"required\":false,\"label\":\"Description\",\"className\":\"form-control\",\"name\":\"textarea-1723621880613-0\",\"access\":false,\"subtype\":\"textarea\",\"rows\":10},{\"type\":\"number\",\"required\":false,\"label\":\"Price\",\"className\":\"form-control\",\"name\":\"number-1723621906034-0\",\"access\":false,\"subtype\":\"number\"},{\"type\":\"date\",\"required\":false,\"label\":\"Date\",\"className\":\"form-control\",\"name\":\"date-1723621921831-0\",\"access\":false,\"subtype\":\"date\"}]', '1', 'Rocky,Pulp Fiction,The Godfather', '2024-08-14 02:25:55', '2024-08-14 02:25:55'),
(8, 1, 'new test', '[{\"type\":\"date\",\"required\":false,\"label\":\"Date Field\",\"className\":\"form-control\",\"name\":\"date-1723622858217-0\",\"access\":false,\"subtype\":\"date\"}]', '1', 'Pulp Fiction', '2024-08-14 02:37:42', '2024-08-14 02:37:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `intakeforms`
--
ALTER TABLE `intakeforms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `intakeforms`
--
ALTER TABLE `intakeforms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
