-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2021-01-05 08:31:09
-- サーバのバージョン： 10.4.17-MariaDB
-- PHP のバージョン: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `ordernavi`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `friendroute`
--

CREATE TABLE `friendroute` (
  `uid` char(28) NOT NULL,
  `pinname` varchar(30) NOT NULL,
  `lat` varchar(30) NOT NULL,
  `lng` varchar(30) NOT NULL,
  `number` varchar(15) NOT NULL,
  `name` varchar(30) NOT NULL,
  `id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `friendroute`
--

INSERT INTO `friendroute` (`uid`, `pinname`, `lat`, `lng`, `number`, `name`, `id`) VALUES
('am5QQCHPQ8WkjZM2j6ezAXrVRMw1', 'ルート1', '34.75859473963984', '137.39106301401367', '0', 'フレンドユーザー', '176ccbeddd5ba'),
('am5QQCHPQ8WkjZM2j6ezAXrVRMw1', 'ルート2', '34.7645178025175', '137.37527016733398', '1', 'フレンドユーザー', '176ccbeddd5ba'),
('am5QQCHPQ8WkjZM2j6ezAXrVRMw1', 'ルート3', '34.76649206237332', '137.40548256967773', '2', 'フレンドユーザー', '176ccbeddd5ba'),
('am5QQCHPQ8WkjZM2j6ezAXrVRMw1', 'ルート4', '34.77636265332208', '137.38385323618164', '3', 'フレンドユーザー', '176ccbeddd5ba'),
('MXwJ86gEIvQcwVE2OEe6xTd04E83', 'ルート1', '35.1841923351644', '136.89652834124757', '0', 'null', '176ccbeddd5ba'),
('MXwJ86gEIvQcwVE2OEe6xTd04E83', 'ルート2', '35.18776989400497', '136.89893160052492', '1', 'null', '176ccbeddd5ba'),
('MXwJ86gEIvQcwVE2OEe6xTd04E83', 'ルート3', '35.19176815573491', '136.9019356746216', '2', 'null', '176ccbeddd5ba'),
('MXwJ86gEIvQcwVE2OEe6xTd04E83', 'ルート4', '35.187278865842224', '136.90433893389894', '3', 'null', '176ccbeddd5ba'),
('MXwJ86gEIvQcwVE2OEe6xTd04E83', 'ルート5', '35.182789327921284', '136.90459642596437', '4', 'null', '176ccbeddd5ba'),
('MXwJ86gEIvQcwVE2OEe6xTd04E83', 'ルート6', '35.18061342887867', '136.90123558044434', '5', 'null', '176ccbeddd5ba');

-- --------------------------------------------------------

--
-- テーブルの構造 `route`
--

CREATE TABLE `route` (
  `uid` char(28) COLLATE utf8_bin NOT NULL,
  `routename` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pinname` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lat` varchar(30) COLLATE utf8_bin NOT NULL,
  `lng` varchar(30) COLLATE utf8_bin NOT NULL,
  `number` varchar(15) COLLATE utf8_bin NOT NULL,
  `name` varchar(30) COLLATE utf8_bin NOT NULL,
  `id` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- テーブルのデータのダンプ `route`
--

INSERT INTO `route` (`uid`, `routename`, `pinname`, `lat`, `lng`, `number`, `name`, `id`) VALUES
('Oye5GvfCL6XfIpSqwqHnthuzpIO2', '愛知観光', 'ルート1', '35.16913750698823', '136.88313227196653', '0', 'ホストユーザー', '176ccbeddd5ba'),
('Oye5GvfCL6XfIpSqwqHnthuzpIO2', '愛知観光', 'ルート2', '35.172019250988455', '136.88462734222412', '1', 'ホストユーザー', '176ccbeddd5ba'),
('Oye5GvfCL6XfIpSqwqHnthuzpIO2', '愛知観光', 'ルート3', '35.17103187914852', '136.8807290126892', '2', 'ホストユーザー', '176ccbeddd5ba'),
('Oye5GvfCL6XfIpSqwqHnthuzpIO2', '愛知観光', 'ルート4', '35.167593911856095', '136.87969904442747', '3', 'ホストユーザー', '176ccbeddd5ba');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `friendroute`
--
ALTER TABLE `friendroute`
  ADD PRIMARY KEY (`uid`,`number`,`id`);

--
-- テーブルのインデックス `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`uid`,`routename`,`number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
