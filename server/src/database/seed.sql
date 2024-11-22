SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Airport seed data
DELETE FROM Airports;
ALTER TABLE Airports AUTO_INCREMENT = 1;
INSERT INTO Airports (airport_name, airport_code, location) VALUES 
('Los Angeles International Airport', 'LAX', 'Los Angeles, CA'),
('John F. Kennedy International Airport', 'JFK', 'New York, NY'),
('O\'Hare International Airport', 'ORD', 'Chicago, IL'),
('San Francisco International Airport', 'SFO', 'San Francisco, CA'),
('Hartsfield-Jackson Atlanta International Airport', 'ATL', 'Atlanta, GA'),
('Denver International Airport', 'DEN', 'Denver, CO'),
('Dallas/Fort Worth International Airport', 'DFW', 'Dallas, TX'),
('Seattle-Tacoma International Airport', 'SEA', 'Seattle, WA'),
('Miami International Airport', 'MIA', 'Miami, FL'),
('Orlando International Airport', 'MCO', 'Orlando, FL'),
('Logan International Airport', 'BOS', 'Boston, MA'),
('McCarran International Airport', 'LAS', 'Las Vegas, NV'),
('Phoenix Sky Harbor International Airport', 'PHX', 'Phoenix, AZ'),
('Detroit Metropolitan Airport', 'DTW', 'Detroit, MI'),
('Salt Lake City International Airport', 'SLC', 'Salt Lake City, UT');


-- Insert values into Plane_Types table
DELETE FROM Plane_Types;
ALTER TABLE Plane_Types AUTO_INCREMENT = 1;
INSERT INTO Plane_Types (type_name, capacity, range_in_hrs) VALUES 
('Boeing 737', 160, 5),
('Boeing 747', 366, 14),
('Boeing 757', 200, 7),
('Boeing 767', 218, 10),
('Boeing 777', 396, 15),
('Boeing 787', 242, 16),
('Airbus A220', 130, 6),
('Airbus A320', 180, 6),
('Airbus A330', 277, 13),
('Airbus A340', 380, 14),
('Airbus A350', 325, 17),
('Airbus A380', 555, 16),
('Embraer E175', 76, 4),
('Bombardier CRJ900', 90, 3),
('ATR 72', 78, 2);


-- Insert values into Planes table
DELETE FROM Planes;
ALTER TABLE Planes AUTO_INCREMENT = 1;
INSERT INTO Planes (plane_type_id, current_airport_id) VALUES 
(1, 1),
(2, 3),
(3, 5),
(4, 7),
(5, 10),
(6, 2),
(7, 4),
(8, 6),
(9, 8),
(10, 9),
(11, 12),
(12, 11),
(13, 14),
(14, 13),
(15, 15);

-- Insert values into Flights table
DELETE FROM Flights;
ALTER TABLE Flights AUTO_INCREMENT = 1;
INSERT INTO Flights (plane_id, depart_airport_id, arrive_airport_id, depart_time, arrive_time) VALUES 
(1, 1, 3, '2024-11-05 08:00:00', '2024-11-05 11:30:00'),
(2, 3, 5, '2024-11-06 14:15:00', '2024-11-06 18:45:00'),
(3, 5, 2, '2024-11-07 07:00:00', '2024-11-07 10:00:00'),
(4, 7, 8, '2024-11-08 09:30:00', '2024-11-08 12:15:00'),
(5, 10, 1, '2024-11-09 13:00:00', '2024-11-09 20:00:00'),
(6, 2, 9, '2024-11-10 06:00:00', '2024-11-10 12:30:00'),
(7, 4, 11, '2024-11-11 18:00:00', '2024-11-12 00:15:00'),
(8, 6, 12, '2024-11-12 16:30:00', '2024-11-12 21:45:00'),
(9, 8, 10, '2024-11-13 12:00:00', '2024-11-13 17:15:00'),
(10, 9, 14, '2024-11-14 07:45:00', '2024-11-14 14:15:00'),
(11, 12, 15, '2024-11-15 15:30:00', '2024-11-15 22:00:00'),
(12, 11, 13, '2024-11-16 10:15:00', '2024-11-16 16:30:00'),
(13, 14, 7, '2024-11-17 08:00:00', '2024-11-17 13:00:00'),
(14, 13, 6, '2024-11-18 09:30:00', '2024-11-18 14:15:00'),
(15, 15, 4, '2024-11-19 06:45:00', '2024-11-19 10:30:00');


-- Insert values into Passenger_flights table
DELETE FROM Passenger_flights;
INSERT INTO Passenger_flights (passenger_id, flight_id) VALUES 
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(6, 4),
(7, 5),
(8, 6),
(9, 6),
(10, 7),
(11, 8),
(12, 9),
(13, 10),
(14, 11),
(15, 12);

-- Insert values into Users table
DELETE FROM Users;
ALTER TABLE Users AUTO_INCREMENT = 1;
INSERT INTO Users (username, password) VALUES
('admin', 'hashed_password1'),
('john.doe@example.com', 'hashed_password2'),
('jane.smith@example.com', 'hashed_password3'),
('michael.j@example.com', 'hashed_password4'),
('emily.d@example.com', 'hashed_password5'),
('daniel.b@example.com', 'hashed_password6'),
('sarah.m@example.com', 'hashed_password7'),
('david.w@example.com', 'hashed_password8'),
('laura.m@example.com', 'hashed_password9'),
('james.t@example.com', 'hashed_password10'),
('emma.a@example.com', 'hashed_password11');

-- Insert values into Roles Table
DELETE FROM Roles;
INSERT INTO Roles (user_id, role) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'user'),
(4, 'user'),
(5, 'user'),
(6, 'user'),
(7, 'user'),
(8, 'user'),
(9, 'user'),
(10, 'user'), 
(11, 'user');


-- Insert values into Passengers Table
DELETE FROM Passengers;
ALTER TABLE Passengers AUTO_INCREMENT = 1;
INSERT INTO Passengers (user_id, first_name, last_name, address, city, state, zipcode, passport_number) VALUES
(2, 'John', 'Doe', '123 Elm St', 'Springfield', 'IL', '62704', 'A12345678'),
(3, 'Jane', 'Smith', '456 Oak St', 'Hometown', 'TX', '77001', 'B23456789'),
(4, 'Michael', 'Johnson', '789 Pine St', 'Austin', 'TX', '73301', NULL),     
(5, 'Emily', 'Davis', '321 Maple St', 'Seattle', 'WA', '98101', 'D45678901'),
(6, 'Daniel', 'Brown', '654 Birch St', 'Denver', 'CO', '80201', 'E56789012'),
(7, 'Sarah', 'Miller', '987 Cedar St', 'Miami', 'FL', '33101', NULL),          
(8, 'David', 'Wilson', '147 Redwood St', 'Boston', 'MA', '02101', 'G78901234'),
(9, 'Laura', 'Moore', '258 Fir St', 'Phoenix', 'AZ', '85001', 'H89012345'),
(10, 'James', 'Taylor', '369 Walnut St', 'San Francisco', 'CA', '94101', 'I90123456'),
(11, 'Emma', 'Anderson', '147 Spruce St', 'Las Vegas', 'NV', '89101', 'J01234567');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

SELECT * FROM Airports;
SELECT * FROM Plane_Types;
SELECT * FROM Planes;
SELECT * FROM Flights;
SELECT * FROM Passenger_flights;
SELECT * FROM Users;
SELECT * FROM Roles;
SELECT * FROM Passengers;
