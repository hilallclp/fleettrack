-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 28 Kas 2025, 11:59:05
-- Sunucu sürümü: 8.0.43
-- PHP Sürümü: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `fleettrack`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `alerts`
--

CREATE TABLE `alerts` (
  `alerts_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `created_by` int NOT NULL,
  `alert_type` varchar(100) NOT NULL,
  `severity` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `alerts`
--

INSERT INTO `alerts` (`alerts_id`, `vehicle_id`, `created_by`, `alert_type`, `severity`) VALUES
(1, 1, 1, 'km bakım uyarısı', 'medium'),
(2, 2, 2, 'Akü Düşük / Şarj Sistemi Arızas', 'high'),
(3, 3, 1, 'km bakım uyarısı', 'low'),
(4, 4, 2, 'Yağ Basıncı Düşük', 'medium'),
(5, 5, 1, 'km bakım uyarısı', 'high'),
(6, 6, 2, 'Park Sensörü Arızası', 'low'),
(7, 7, 1, 'km bakım uyarısı', 'medium'),
(8, 8, 2, 'arıza uyarısı', 'high'),
(9, 9, 1, 'km bakım uyarısı', 'low'),
(10, 10, 2, 'ABS uyarısı', 'medium');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `assignments`
--

CREATE TABLE `assignments` (
  `assignments_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `user_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `assignments`
--

INSERT INTO `assignments` (`assignments_id`, `vehicle_id`, `user_id`, `start_date`, `end_date`) VALUES
(1, 1, 3, '2025-01-01', '2025-01-10'),
(2, 2, 4, '2025-01-05', NULL),
(3, 3, 5, '2025-01-07', NULL),
(4, 4, 9, '2025-01-10', '2025-01-20'),
(5, 5, 3, '2025-01-15', NULL),
(6, 6, 4, '2025-01-20', NULL),
(7, 7, 5, '2025-01-22', '2025-01-30'),
(8, 8, 9, '2025-02-01', NULL),
(9, 9, 3, '2025-02-05', NULL),
(10, 10, 4, '2025-02-10', NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `logs`
--

CREATE TABLE `logs` (
  `logs_id` int NOT NULL,
  `user_id` int NOT NULL,
  `action` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `logs`
--

INSERT INTO `logs` (`logs_id`, `user_id`, `action`) VALUES
(1, 1, 'login'),
(2, 2, 'login'),
(3, 3, 'update vehicle'),
(4, 4, 'add maintenance'),
(5, 5, 'delete assignment'),
(6, 6, 'update maintenance'),
(7, 7, 'login'),
(8, 8, 'add alert'),
(9, 9, 'update route'),
(10, 10, 'logout');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `maintenance`
--

CREATE TABLE `maintenance` (
  `maintenance_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `technician_id` int NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'bekliyor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `maintenance`
--

INSERT INTO `maintenance` (`maintenance_id`, `vehicle_id`, `technician_id`, `cost`, `status`) VALUES
(1, 1, 6, 500.00, 'tamamlandı'),
(2, 2, 7, 300.00, 'bekliyor'),
(3, 3, 8, 450.00, 'tamamlandı'),
(4, 4, 10, 200.00, 'bekliyor'),
(5, 5, 6, 600.00, 'tamamlandı'),
(6, 6, 7, 150.00, 'tamamlandı'),
(7, 7, 8, 350.00, 'bekliyor'),
(8, 8, 10, 400.00, 'tamamlandı'),
(9, 9, 6, 250.00, 'bekliyor'),
(10, 10, 7, 500.00, 'tamamlandı');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `maintenance_parts`
--

CREATE TABLE `maintenance_parts` (
  `maintenance_parts_id` int NOT NULL,
  `maintenance_id` int NOT NULL,
  `part_id` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `maintenance_parts`
--

INSERT INTO `maintenance_parts` (`maintenance_parts_id`, `maintenance_id`, `part_id`, `total_price`) VALUES
(1, 1, 1, 75.00),
(2, 1, 2, 60.00),
(3, 2, 3, 120.00),
(4, 3, 4, 500.00),
(5, 4, 5, 25.00),
(6, 5, 6, 350.00),
(7, 6, 7, 80.00),
(8, 7, 8, 250.00),
(9, 8, 9, 30.00),
(10, 9, 10, 20.00);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `parts`
--

CREATE TABLE `parts` (
  `parts_id` int NOT NULL,
  `parts_name` varchar(100) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `parts`
--

INSERT INTO `parts` (`parts_id`, `parts_name`, `stock`, `price`) VALUES
(1, 'Yağ Filtresi', 50, 75.00),
(2, 'Hava Filtresi', 40, 60.00),
(3, 'Fren Balatası', 30, 120.00),
(4, 'Akü', 20, 500.00),
(5, 'Buji', 100, 25.00),
(6, 'Debriyaj Balatası', 15, 350.00),
(7, 'V Kayışı', 25, 80.00),
(8, 'Amortisör', 20, 250.00),
(9, 'Far Ampulü', 60, 30.00),
(10, 'Silecek', 70, 20.00);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `roles`
--

CREATE TABLE `roles` (
  `rol_id` int NOT NULL,
  `rol_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `roles`
--

INSERT INTO `roles` (`rol_id`, `rol_name`) VALUES
(1, 'admin'),
(2, 'driver'),
(3, 'technician');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `routes`
--

CREATE TABLE `routes` (
  `routes_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `user_id` int NOT NULL,
  `start_location` varchar(100) NOT NULL,
  `end_location` varchar(100) NOT NULL,
  `distance_km` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `routes`
--

INSERT INTO `routes` (`routes_id`, `vehicle_id`, `user_id`, `start_location`, `end_location`, `distance_km`) VALUES
(1, 1, 3, 'İstanbul', 'Ankara', 450),
(2, 2, 4, 'Malatya', 'Muş', 385),
(3, 3, 5, 'İzmir', 'Manisa', 80),
(4, 4, 9, 'Antalya', 'Alanya', 135),
(5, 5, 3, 'Kastamonulu', 'Muğla', 850),
(6, 6, 4, 'İstanbul', 'Edirne', 230),
(7, 7, 5, 'Bursa', 'Eskişehir', 120),
(8, 8, 9, 'İzmir', 'Aydın', 150),
(9, 9, 3, 'Ankara', 'Kayseri', 320),
(10, 10, 4, 'İstanbul', 'Tekirdağ', 140);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `password`, `phone`, `role_id`) VALUES
(1, 'Hilal Calp', '1234', '05000000001', 1),
(2, 'Büşra İnan', '1234', '05000000002', 1),
(3, 'Erva Ergül', '1234', '05000000003', 2),
(4, 'Fatih Veli', '1234', '05000000004', 2),
(5, 'Nazlı Demir', '1234', '05000000005', 2),
(6, 'Özge Kaya', '1234', '05000000006', 3),
(7, 'Rabia Yılmaz', '1234', '05000000007', 3),
(8, 'Nisa Çelik', '1234', '05000000008', 3),
(9, 'Emine Şahin', '1234', '05000000009', 2),
(10, 'Deniz Arslan', '1234', '05000000010', 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int NOT NULL,
  `plate_number` varchar(20) NOT NULL,
  `model` varchar(100) NOT NULL,
  `mileage` int NOT NULL DEFAULT '0',
  `status` varchar(20) NOT NULL DEFAULT 'aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `plate_number`, `model`, `mileage`, `status`) VALUES
(1, '34ABC01', 'Ford Transit', 12000, 'aktif'),
(2, '34ABC02', 'Toyota Corolla', 8000, 'aktif'),
(3, '34ABC03', 'Volkswagen Passat', 15000, 'bakımda'),
(4, '34ABC04', 'Renault Clio', 5000, 'aktif'),
(5, '34SAV05', 'Mercedes Sprinter', 20000, 'bakımda'),
(6, '34ABC06', 'Fiat Doblo', 3000, 'aktif'),
(7, '34ABC07', 'Hyundai i20', 7000, 'aktif'),
(8, '34ABC08', 'Opel Astra', 18000, 'pasif'),
(9, '34ABC09', 'Peugeot 308', 9000, 'aktif'),
(10, '34ABC10', 'Honda Civic', 11000, 'aktif');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `alerts`
--
ALTER TABLE `alerts`
  ADD PRIMARY KEY (`alerts_id`),
  ADD KEY `fk_alerts_vehicle` (`vehicle_id`),
  ADD KEY `fk_alerts_user` (`created_by`);

--
-- Tablo için indeksler `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignments_id`),
  ADD KEY `fk_assignments_vehicle` (`vehicle_id`),
  ADD KEY `fk_assignments_user` (`user_id`);

--
-- Tablo için indeksler `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`logs_id`),
  ADD KEY `fk_logs_user` (`user_id`);

--
-- Tablo için indeksler `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`maintenance_id`),
  ADD KEY `fk_maintenance_vehicle` (`vehicle_id`),
  ADD KEY `fk_maintenance_technician` (`technician_id`);

--
-- Tablo için indeksler `maintenance_parts`
--
ALTER TABLE `maintenance_parts`
  ADD PRIMARY KEY (`maintenance_parts_id`),
  ADD KEY `fk_maintenance_parts_maintenance` (`maintenance_id`),
  ADD KEY `fk_maintenance_parts_parts` (`part_id`);

--
-- Tablo için indeksler `parts`
--
ALTER TABLE `parts`
  ADD PRIMARY KEY (`parts_id`);

--
-- Tablo için indeksler `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`),
  ADD UNIQUE KEY `rol_name` (`rol_name`);

--
-- Tablo için indeksler `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`routes_id`),
  ADD KEY `fk_routes_vehicle` (`vehicle_id`),
  ADD KEY `fk_routes_user` (`user_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_users_roles` (`role_id`);

--
-- Tablo için indeksler `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `alerts`
--
ALTER TABLE `alerts`
  MODIFY `alerts_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignments_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `logs`
--
ALTER TABLE `logs`
  MODIFY `logs_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `maintenance_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `maintenance_parts`
--
ALTER TABLE `maintenance_parts`
  MODIFY `maintenance_parts_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `parts`
--
ALTER TABLE `parts`
  MODIFY `parts_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `routes`
--
ALTER TABLE `routes`
  MODIFY `routes_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tablo için AUTO_INCREMENT değeri `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `alerts`
--
ALTER TABLE `alerts`
  ADD CONSTRAINT `fk_alerts_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alerts_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `fk_assignments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_assignments_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `fk_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `fk_maintenance_technician` FOREIGN KEY (`technician_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_maintenance_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `maintenance_parts`
--
ALTER TABLE `maintenance_parts`
  ADD CONSTRAINT `fk_maintenance_parts_maintenance` FOREIGN KEY (`maintenance_id`) REFERENCES `maintenance` (`maintenance_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_maintenance_parts_parts` FOREIGN KEY (`part_id`) REFERENCES `parts` (`parts_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `fk_routes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_routes_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`rol_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- =========================================================
-- TRIGGER ADI : trg_reduce_part_stock
-- AMAÇ        : Bakım sırasında kullanılan parçaların
--               stok miktarını otomatik olarak azaltmak
-- TETİKLENME  : maintenance_parts tablosuna yeni kayıt
--               eklendiğinde (AFTER INSERT)
-- AÇIKLAMA    : Her bakım parçası eklendiğinde ilgili
--               parçanın stok bilgisi 1 azaltılır
-- =========================================================

DELIMITER $$

CREATE TRIGGER trg_reduce_part_stock
AFTER INSERT ON maintenance_parts
FOR EACH ROW
BEGIN
    -- Yeni eklenen bakım parçasının parça ID'sine göre
    -- parts tablosundaki stok bilgisini 1 azalt
    UPDATE parts
    SET stock = stock - 1
    WHERE parts_id = NEW.part_id
      AND stock > 0; -- stok negatif olmasın diye kontrol
END$$

DELIMITER ;
-- =========================================================
-- TRIGGER ADI : trg_vehicle_in_maintenance
-- AMAÇ        : Yeni bir bakım kaydı eklendiğinde,
--               ilgili aracın durumunu otomatik olarak
--               'bakımda' durumuna geçirmek
-- TETİKLENME  : maintenance tablosuna yeni kayıt
--               eklendiğinde (AFTER INSERT)
-- =========================================================

DELIMITER $$

CREATE TRIGGER trg_vehicle_in_maintenance
AFTER INSERT ON maintenance
FOR EACH ROW
BEGIN
    -- Bakım kaydı eklenen aracın durumunu
    -- vehicles tablosunda 'bakımda' olarak güncelle
    UPDATE vehicles
    SET status = 'bakımda'
    WHERE vehicle_id = NEW.vehicle_id;
END$$

DELIMITER ;
-- =========================================================
-- TRIGGER ADI : trg_vehicle_active_after_maintenance
-- AMAÇ        : Bakım durumu 'tamamlandı' olduğunda
--               aracın tekrar 'aktif' duruma alınması
-- TETİKLENME  : maintenance tablosunda UPDATE işlemi
--               yapıldığında (AFTER UPDATE)
-- AÇIKLAMA    : Sadece bakım durumu değiştiğinde çalışır
-- =========================================================

DELIMITER $$

CREATE TRIGGER trg_vehicle_active_after_maintenance
AFTER UPDATE ON maintenance
FOR EACH ROW
BEGIN
    -- Eğer bakım durumu daha önce tamamlanmamışken
    -- şimdi 'tamamlandı' olarak güncellendiyse
    IF OLD.status <> 'tamamlandı' AND NEW.status = 'tamamlandı' THEN
        
        -- İlgili aracın durumunu tekrar 'aktif' yap
        UPDATE vehicles
        SET status = 'aktif'
        WHERE vehicle_id = NEW.vehicle_id;
        
    END IF;
END$$

DELIMITER ;
