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

-- Insert values into Passengers table
DELETE FROM Passengers;
ALTER TABLE Passengers AUTO_INCREMENT = 1;
INSERT INTO Passengers (first_name, last_name, phone, email, address, city, state_abbr, zip_code, passport_number) VALUES 
('John', 'Doe', '555-123-4567', 'john.doe@example.com', '123 Elm St', 'Springfield', 'IL', '62704', 'P123456789'),
('Jane', 'Smith', '555-987-6543', 'jane.smith@example.com', '456 Oak Ave', 'Chicago', 'IL', '60616', 'P987654321'),
('Alice', 'Johnson', '555-654-1234', 'alice.johnson@example.com', '789 Maple Dr', 'New York', 'NY', '10001', 'P234567891'),
('Bob', 'Williams', '555-321-4567', 'bob.williams@example.com', '101 Pine Ln', 'Los Angeles', 'CA', '90001', 'P345678912'),
('Mary', 'Brown', '555-432-1765', 'mary.brown@example.com', '202 Cedar Ct', 'Miami', 'FL', '33101', 'P456789123'),
('Mike', 'Davis', '555-213-5476', 'mike.davis@example.com', '303 Birch Rd', 'Seattle', 'WA', '98101', 'P567891234'),
('Emily', 'Miller', '555-567-1243', 'emily.miller@example.com', '404 Spruce St', 'Denver', 'CO', '80201', 'P678912345'),
('David', 'Wilson', '555-789-2134', 'david.wilson@example.com', '505 Aspen Blvd', 'Boston', 'MA', '02101', 'P789123456'),
('Sarah', 'Moore', '555-432-1987', 'sarah.moore@example.com', '606 Redwood Ave', 'Orlando', 'FL', '32801', 'P891234567'),
('James', 'Taylor', '555-321-7894', 'james.taylor@example.com', '707 Palm Way', 'Phoenix', 'AZ', '85001', 'P912345678'),
('Patricia', 'Anderson', '555-876-5432', 'patricia.anderson@example.com', '808 Fir Ln', 'Houston', 'TX', '77001', 'P123789456'),
('Chris', 'Thomas', '555-213-8765', 'chris.thomas@example.com', '909 Willow Dr', 'Dallas', 'TX', '75201', 'P234891567'),
('Laura', 'Jackson', '555-564-7382', 'laura.jackson@example.com', '1010 Cypress St', 'San Diego', 'CA', '92101', 'P345912678'),
('Paul', 'White', '555-897-6345', 'paul.white@example.com', '1111 Sequoia Pl', 'Atlanta', 'GA', '30301', 'P456123789'),
('Linda', 'Harris', '555-214-3658', 'linda.harris@example.com', '1212 Magnolia Blvd', 'San Francisco', 'CA', '94101', 'P567234891');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

SELECT * FROM Airports;
SELECT * FROM Plane_Types;
SELECT * FROM Planes;
SELECT * FROM Flights;
SELECT * FROM Passenger_flights;
SELECT * FROM Passengers;
