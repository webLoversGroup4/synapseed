-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 14, 2024 at 03:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `research_education_collaborative`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `sender` varchar(50) NOT NULL,
  `receiver` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `sender`, `receiver`, `message`, `file_path`, `created_at`) VALUES
(38, 'Machaya Terrence', 'OtherUser', 'hi guys welcome to the chatroom where we can all share all the brilliant ideas that we have. Feel free to contribute in an positive way ', NULL, '2024-04-12 12:13:01'),
(39, 'Machaya Terrence', 'OtherUser', 'So lets get started !!!!!!!!!!\r\n', NULL, '2024-04-12 12:14:09'),
(40, 'Tendai Machaya', 'OtherUser', 'Hi my name Tendai Terrence Machaya and am passionate about machine learning research especially in the area of deep neural networks. Is anyone willing to collaborate with me on my ongoing research.', NULL, '2024-04-12 12:17:52'),
(41, 'Tendai Machaya', 'OtherUser', 'The research is on how Large Language Models can be optimized to reduce hallucinations, such that they can be optimized to aid in therapy.', NULL, '2024-04-12 12:22:00'),
(42, 'AnneAL AlwalaaL', 'OtherUser', 'hi guyz am happy to join the research community ', NULL, '2024-04-12 21:31:59'),
(43, 'MachayaWekwa TerrenceWedu', 'OtherUser', 'Hi guyz. How are you. Am doing fine ', NULL, '2024-04-12 21:35:37'),
(44, 'AnneAL AlwalaaL', 'OtherUser', 'so i have been reading about this topic on Energy. And i found nuclear energy to be fascinating\r\n', NULL, '2024-04-12 21:36:54'),
(45, 'MachayaWekwa TerrenceWedu', 'OtherUser', 'wow tell us more ', NULL, '2024-04-12 21:37:51'),
(46, 'AnneAL AlwalaaL', 'OtherUser', 'sure thing i will send an article about it ', NULL, '2024-04-12 21:38:59'),
(47, 'AnneAL AlwalaaL', 'OtherUser', 'Okay guys i just fixed a bug\r\n', NULL, '2024-04-13 12:28:15'),
(48, '1 Machaya', 'OtherUser', 'Hi guys ', NULL, '2024-04-13 15:35:36'),
(49, 'Tendai Machaya', 'OtherUser', '11', NULL, '2024-04-13 15:37:32'),
(50, 'Tendai Machaya', 'OtherUser', 'kkk', NULL, '2024-04-13 19:43:18'),
(51, 'Tendai Machaya', 'OtherUser', 'kkkkkkkkkkkk', NULL, '2024-04-13 19:45:49'),
(52, 'Tendai Machaya', 'OtherUser', 'kkkkk', NULL, '2024-04-13 19:45:58'),
(53, 'Tendai Machaya', 'OtherUser', 'kkkkkkkkkkkkk', NULL, '2024-04-13 19:48:31'),
(54, 'Tendai Machaya', 'OtherUser', 'ok', NULL, '2024-04-13 19:48:41'),
(55, 'Tendai Machaya', 'OtherUser', 'kkkkkkkkk', NULL, '2024-04-13 19:50:13'),
(56, 'Tendai Machaya', 'OtherUser', 'kkkkkkkkkk', NULL, '2024-04-13 19:50:19');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `paper_id` int(11) DEFAULT NULL,
  `parent_id` int(11) NOT NULL DEFAULT -1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `content`, `user_id`, `paper_id`, `parent_id`, `created_at`) VALUES
(3, 'This is a sample comment.', 20, 1, -1, '2024-04-12 14:10:10'),
(4, 'Another sample comment.', 20, 1, -1, '2024-04-12 14:10:10'),
(5, 'Reply to comment 1.', 19, 9, 1, '2024-04-12 14:10:10'),
(6, 'Testing the function.', 17, 1, -1, '2024-04-12 15:47:14'),
(7, 'Testing the function.', 17, 1, -1, '2024-04-12 15:47:15'),
(8, 'Hello world my name is Tendai.', 20, 1, -1, '2024-04-12 18:40:21'),
(9, 'Hello world my name is Tendai.', 20, 1, -1, '2024-04-12 18:40:23'),
(10, 'Hello world my name is Tendai.', 20, 9, -1, '2024-04-12 18:41:02'),
(11, 'Hello world my name is Tendai.', 20, 9, 1, '2024-04-12 18:41:03'),
(12, 'yee', 20, 1, -1, '2024-04-13 20:42:21'),
(13, 'yee', 20, 1, -1, '2024-04-13 20:42:22'),
(14, 'yee', 20, 1, -1, '2024-04-13 20:42:27'),
(15, 'yee', 20, 1, -1, '2024-04-13 20:42:32'),
(16, 'yee', 20, 1, -1, '2024-04-13 20:42:33'),
(26, 'okay', 20, 1, -1, '2024-04-13 20:59:24'),
(27, 'kkkkkkkkk', 16, NULL, -1, '2024-04-13 21:16:01'),
(28, 'dddddddd', 16, NULL, -1, '2024-04-13 21:16:09'),
(29, 'but some people', 16, NULL, -1, '2024-04-13 21:16:41'),
(30, 'eeeeee', 16, NULL, -1, '2024-04-13 21:16:59'),
(31, 'llllllllllllll', 16, NULL, -1, '2024-04-13 21:29:36'),
(32, 'mmmmm', 16, NULL, -1, '2024-04-13 21:32:37'),
(33, 'kkkkkkkk', 16, NULL, -1, '2024-04-13 21:34:19'),
(34, 'kkkk', 16, NULL, -1, '2024-04-13 21:38:14'),
(35, 'kkkkkkkkkk', 16, NULL, -1, '2024-04-13 21:41:06'),
(36, 'kkkkkkkkkkk', 16, NULL, -1, '2024-04-13 22:03:11');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `file_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploaded_by` int(11) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`file_id`, `filename`, `file_path`, `uploaded_by`, `uploaded_at`, `title`, `description`) VALUES
(5, 'vid-8.mp4', '../uploads/qSCtY9HZU5bOw8V3IpNUOF9kgkJEjnsXrqJUUDJGaFGjlkNv7y6nfMxD6gG89eVQ8.mp4', 16, '2024-04-13 19:03:26', 'Happy', 'Am happy am working '),
(6, '1 qG1qexW2PrbR-Jj7w9m_TQ.jpg', '../uploads/wBEsHTKaKFSvuDwHINo23Rc2QsFZBkbcuAwDauFnROyt4gxX63yMCSNyiGFcD7ylu.jpg', 16, '2024-04-13 19:04:18', 'AI', 'AI is rocking the streets '),
(7, 'SET-Outlook-for-Zimbabwe-Economy_Sep2017.pdf', '../uploads/QmJ0pqdZnRQJa1ZoRa1QAsXJ7xcNZ0zBuWj7fnDGA5jrWdCHDQQGwUFdCTBnPWgE0.pdf', 16, '2024-04-14 00:15:22', 'hhhhhh', 'Tendai'),
(8, 'AJCR 1_2003 - ajol-file-journals_310_articles_136419_submission_proof_136419-3697-365198-1-10-20160531.pdf', '../uploads/hXHhInFntPyaW0rs91qmAg8cZl72N64eywRmEraDxQEqUuuZkFYQAbDtAui2A2ok5.pdf', 16, '2024-04-14 00:15:58', 'hhhhhhhhhh', 'hhhhhhhhhh'),
(9, '99-recurrences.pdf', '../uploads/aeLHj8Cx4sVkJgRfgf3aXeGzKCqzOHqHz8wAzHSbzGcGcwgY9ASWGzTGeQ8j0inQ3.pdf', 16, '2024-04-14 00:17:52', 'dddddd', 'ddddddd');

-- --------------------------------------------------------

--
-- Table structure for table `papers`
--

CREATE TABLE `papers` (
  `paper_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `abstract` text DEFAULT NULL,
  `file_url` varchar(255) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `status_approval_id` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `papers`
--

INSERT INTO `papers` (`paper_id`, `title`, `abstract`, `file_url`, `author_id`, `status_approval_id`, `created_at`) VALUES
(1, 'Research on Machine Learning', 'A study on various machine learning algorithms.', '/uploads/ml_paper.pdf', 1, 1, '2024-04-12 11:13:41'),
(2, 'Analysis of Neural Networks', 'Exploring deep neural networks and their applications.', '/uploads/nn_analysis.pdf', 2, 1, '2024-04-12 11:13:41'),
(4, 'Research on Machine Learning', 'A study on various machine learning algorithms.', '/uploads/ml_paper.pdf', 1, 1, '2024-04-12 11:15:54'),
(5, 'Analysis of Neural Networks', 'Exploring deep neural networks and their applications.', '/uploads/nn_analysis.pdf', 2, 1, '2024-04-12 11:15:55'),
(7, 'Research on Machine Learning', 'A study on various machine learning algorithms.', '/uploads/ml_paper.pdf', 16, 1, '2024-04-12 11:17:27'),
(8, 'Analysis of Neural Networks', 'Exploring deep neural networks and their applications.', '/uploads/nn_analysis.pdf', 17, 1, '2024-04-12 11:17:28'),
(9, 'Introduction to Natural Language Processing', 'Fundamentals of NLP and its use in text analysis.', '/uploads/nlp_intro.pdf', 18, 1, '2024-04-12 11:17:30'),
(10, 'Data Mining Techniques', 'Analyzing data mining methods for pattern discovery.', '/uploads/data_mining.pdf', 19, 1, '2024-04-12 11:17:30'),
(11, 'Overview of Computer Vision', 'Overview of computer vision algorithms and applications.', '/uploads/computer_vision.pdf', 20, 1, '2024-04-12 11:17:31'),
(12, 'dddddd', 'dddddddd', '../uploads/ToSF0M0MKEb3IM9jcQB70gsCKmjlVOCQKaz5127iF27S2xPx2x5unFhyhP4pYsxqQ.pdf', 16, 0, '2024-04-14 00:31:22'),
(13, 'now you are working ', 'wow', '../uploads/wVXhWLCqsjUtu2J9339VdWLeLeRCkBAAiX4ehFf4ta440Rh3j4xXciesXfzXprCCx.pdf', 16, 0, '2024-04-14 00:32:38'),
(14, '111111', '111111', '../uploads/BF5MBHSf9VUzoO37krqRIniEcKs0qj8BSp35fz80qjB8dRMfUSw4u1g8zvOVosuSG.pdf', 16, 0, '2024-04-14 00:33:01'),
(15, 'ttttttttttttt', 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm10ttt', '../uploads/YWywv6CLBcBfC3ryidEJJCUnrGudlTzarSWH4eYkWQ83UADeXxza9D1urE6VVpKi8.pdf', 16, 0, '2024-04-14 00:37:39'),
(16, 'tttttttttttttttt', 'hhhhmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', '../uploads/TI00KKMZXnDgUTn4STIOxkmLCdcnTdt9NeyfHN0eySAHYJLbq59YauLVHPpVicrDn.pdf', 16, 0, '2024-04-14 00:38:54'),
(17, 'ddddddddddd', 'ddddddddddddddddddddddddddddddddddddddddddddddddddddkkkkk', '../uploads/pq0qH4yRKuokSfVw867HGKLeULg3Yx1j5XW3GjLSGGAPwfRK2yGB8fepM35hMFRjv.pdf', 16, 0, '2024-04-14 00:57:12'),
(18, 'kkkkkkkkkkkkkkkk', 'but so am soryry hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', '../uploads/IuYFvTiyhv2S1HolOu616qj6M1jhqYrWo5LbStf8sFtHO8EYUp7RbFDq28UmaMRAT.pdf', 16, 0, '2024-04-14 01:17:04');

-- --------------------------------------------------------

--
-- Table structure for table `peer_reviews`
--

CREATE TABLE `peer_reviews` (
  `review_id` int(11) NOT NULL,
  `paper_id` int(11) DEFAULT NULL,
  `reviewer_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `reviewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `peer_reviews`
--

INSERT INTO `peer_reviews` (`review_id`, `paper_id`, `reviewer_id`, `rating`, `comments`, `reviewed_at`) VALUES
(1, 1, 20, 10, 'This was a brilliant paper', '2024-04-13 19:59:27'),
(2, 1, 16, 3, 'kkkkkkkkkkkkkk', '2024-04-13 20:26:49'),
(3, 4, 16, 3, 'dddd1', '2024-04-13 20:27:38'),
(4, 1, 16, 3, 'oja1', '2024-04-13 20:33:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fname`, `lname`, `email`, `password_hash`, `bio`, `created_at`) VALUES
(1, 'Man Its Tough', 'Machaya', 'machayssa@gmail.com', '$2y$10$inupNZNIITiCJ88SmV5hjOmkHC1BEdCcPYPBmCfxhpZCEJpeDGOCu', 'Man Its Tough', '2024-04-11 21:03:24'),
(2, 'Tendai', 'Machaya', 'tendai1221machaya@gmail.com', '$2y$10$MXF5KHFikjhxNUOYByFfeuXqwTV1v5Hyifr2OCm6aV.SALy57BVru', NULL, '2024-04-11 21:11:03'),
(4, 'Terrence ', 'Machaya', 'machaya@gmail.com', '$2y$10$B3.UkjCuoZ1gosn7sG1K7ewIIkohNkGOpKhDQd4GZMYyoAQedTZqG', NULL, '2024-04-11 21:22:43'),
(5, 'Tendai', 'Machaya', 'tend@gmail.com', '$2y$10$pBoFSx7wKxO8mY70/q0MhOsWv866yByHnMcaIlG5q0tM6WjpGL6we', NULL, '2024-04-11 21:23:18'),
(7, 'Tendai', 'Machaya', 'tednd@gmail.com', '$2y$10$0dBEB/cAmvIOx4BwkNbdwu9xCsZGXzv02ZBdpa7nFddlHbx10xb1.', NULL, '2024-04-11 21:24:05'),
(8, 'aaaa', 'aaaa', 'tendai.machaya@ashesi.edu.gh', '$2y$10$ZcdUEIgWjMoi1ueILOrMh.aM1iaFwPZUTL6zxUiwS8S3xBltDL8gC', NULL, '2024-04-11 21:31:56'),
(11, 'Tendai', 'Machaya', 'machaya11@gmail.com', '$2y$10$UasS4iHHC4soE/36VlQAJOEyCqKCqE/G8avqMYk9ob2HtAP4tSdaa', NULL, '2024-04-11 21:39:36'),
(12, 'Tendai', 'Machaya', 'tenaya@gmail.com', '$2y$10$FVVShZtOZ7M4dpqOOLA60u2WGYTztqt.1EmkpeJSnr7TYoTJJtzEy', NULL, '2024-04-11 21:40:15'),
(13, 'Tendai', 'Machaya', 'ma2chaya@gmail.com', '$2y$10$FKAYlW.vnZbn.n3QjQs2YeoWmxrtWvCkqtEY5j.5rap4.uyC4l/K6', NULL, '2024-04-11 21:41:18'),
(15, 'Tendai', 'Machaya', 'ma21chaya@gmail.com', '$2y$10$zgKlltKVnHY6QPuIQ7Md6.f8n5SyVZE5GwHrX682vxBC7bFSRTOJy', NULL, '2024-04-11 21:44:42'),
(16, 'Tendai', 'Machaya', 'te@gmail.com', '$2y$10$LllmI60hrkLfus7cGWRF1.1RjTnUkMlq/dOPuRcnkuJqgKE/.6vEm', NULL, '2024-04-11 22:04:59'),
(17, 'Machaya', 'Terrence', 'test@example.com', '$2y$10$79bShrbdYrHRFCqrBJSuaeV1GlI222KmTiw2.F4kNoKOFLd7St7ri', NULL, '2024-04-12 02:05:31'),
(18, 'dddddddddd', 'Machaya', 'mac@gmail.com', '$2y$10$KTIE8cFq.Kck0EZzgeBxZO08VaAhy5GudGzscjI1m4ogxWfZgeD46', 'yyyyyyddddddddddddddd', '2024-04-12 02:33:05'),
(19, 'Tendai', 'Machaya', 'techaya@gmail.com', '$2y$10$6zJ2vf4.qxVO00gCw7St/.iOESZxthtxv6TInoB8.E5Gtuhyo4RpK', NULL, '2024-04-12 08:56:39'),
(20, 'terry', 'Machaya', 'tendya@gmail.com', '$2y$10$EY0.nYiBC80gdGV2MnyWTe2MrnT3uRbxah5GP1qc6KaPCC3RPvOI2', NULL, '2024-04-12 08:58:00'),
(26, 'Machaya', 'Terrence', 'terrence@gmail.com', '$2y$10$EZKTNtIi75okZJfFMWh9h.eDN2ePvQi8TXYTKv4A9GiuJ6mKObtfi', NULL, '2024-04-12 09:02:52'),
(27, 'Anne', 'AlwalaaL', 'tendai@gmail.com', '$2y$10$smYrRVX573N3MTQZzRaVHu9erIoKhv/G5g0lKHO5Va.P2VfRnsc9u', 'My name is Tendai Terrence Machaya', '2024-04-12 21:31:12'),
(28, 'MachayaWekwa', 'TerrenceWedu', 'machaya123@gmail.com', '$2y$10$CFN8sftRFMGj/7DMT9kWL.IzvfjJj8FzAADqpp4zoDjVrnYoj5aB.', NULL, '2024-04-12 21:34:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `paper_id` (`paper_id`),
  ADD KEY `group_id` (`parent_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `uploaded_by` (`uploaded_by`);

--
-- Indexes for table `papers`
--
ALTER TABLE `papers`
  ADD PRIMARY KEY (`paper_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `peer_reviews`
--
ALTER TABLE `peer_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `paper_id` (`paper_id`),
  ADD KEY `reviewer_id` (`reviewer_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `papers`
--
ALTER TABLE `papers`
  MODIFY `paper_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `peer_reviews`
--
ALTER TABLE `peer_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`paper_id`) REFERENCES `papers` (`paper_id`) ON DELETE CASCADE;

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `papers`
--
ALTER TABLE `papers`
  ADD CONSTRAINT `papers_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `peer_reviews`
--
ALTER TABLE `peer_reviews`
  ADD CONSTRAINT `peer_reviews_ibfk_1` FOREIGN KEY (`paper_id`) REFERENCES `papers` (`paper_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `peer_reviews_ibfk_2` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
