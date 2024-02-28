/*
Project:    Soul Plane
Team:       Team 107
Partners:   Paul Nguyen, Matt Anderson
File:       Database DDL
Date:       2/14/2024
Author:     Paul Nguyen, Matt Anderson
*/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- Create Airports Table
DROP TABLE IF EXISTS Airports;
CREATE TABLE Airports (
    airport_id INT PRIMARY KEY AUTO_INCREMENT,
    airport_name VARCHAR(255) NOT NULL,
    airport_code VARCHAR(3) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL
);

-- Insert values into Airports table
INSERT INTO Airports (airport_name, airport_code, location) VALUES
('Portland International Airport', 'PDX', 'Portland, OR'),
('Seattle-Tacoma International Airport', 'SEA', 'SeaTac, WA'),
('Spokane International Airport', 'GEG', 'Spokane, WA');

-- Create Plane_types Table
DROP TABLE IF EXISTS Plane_types;
CREATE TABLE Plane_types (
    plane_type_id INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    range_in_hrs INT NOT NULL
);

-- Insert values into Plane_types table
INSERT INTO Plane_types (type_name, capacity, range_in_hrs) VALUES
('Airbus A320-200', 180, 5),
('Boeing B737-800', 190, 5),
('Embraer 135', 37, 3);

-- Create Planes Table
DROP TABLE IF EXISTS Planes;
CREATE TABLE Planes (
    plane_id INT PRIMARY KEY AUTO_INCREMENT,
    plane_type_id INT NOT NULL,
    current_airport_id INT,
    FOREIGN KEY (plane_type_id) REFERENCES Plane_types(plane_type_id)
        ON DELETE RESTRICT,
    FOREIGN KEY (current_airport_id) REFERENCES Airports(airport_id)
    
);

-- Insert values into Planes table
INSERT INTO Planes (current_airport_id, plane_type_id) VALUES
(2, 2),
(3, 1),
(1, 3),
(NULL, 3);

-- Create Flights Table
DROP TABLE IF EXISTS Flights;
CREATE TABLE Flights (
    flight_id INT PRIMARY KEY AUTO_INCREMENT,
    plane_id INT NOT NULL,
    depart_airport_id INT NOT NULL,
    arrive_airport_id INT NOT NULL,
    depart_time DATETIME NOT NULL,
    arrive_time DATETIME NOT NULL,
    FOREIGN KEY (plane_id) REFERENCES Planes(plane_id),
    FOREIGN KEY (depart_airport_id) REFERENCES Airports(airport_id)
        ON DELETE CASCADE,
    FOREIGN KEY (arrive_airport_id) REFERENCES Airports(airport_id)
        ON DELETE CASCADE
    
);

-- Insert values into Flights table
INSERT INTO Flights (depart_airport_id, arrive_airport_id, plane_id, depart_time, arrive_time) VALUES
(1, 2, 3, '2024-02-05 14:30:00', '2024-02-11 02:15:00'),
(2, 3, 1, '2024-03-12 18:15:00', '2024-04-02 12:30:00'),
(3, 1, 2, '2024-04-20 09:45:00', '2024-05-22 11:15:00');


-- Create Passengers_flights Table
DROP TABLE IF EXISTS Passengers_flights;
CREATE TABLE Passengers_flights (
    passenger_id INT NOT NULL,
    flight_id INT NOT NULL,
    PRIMARY KEY (passenger_id, flight_id),
    FOREIGN KEY (passenger_id) REFERENCES Passengers(passenger_id)
        ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id)
        ON DELETE CASCADE
);

-- Insert values into Passengers_flights table
INSERT INTO Passengers_flights (flight_id, passenger_id) VALUES
(2, 1),
(3, 2),
(1, 3);

-- Create Passengers Table
DROP TABLE IF EXISTS Passengers;
CREATE TABLE Passengers (
    passenger_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state_abbr VARCHAR(2) NOT NULL,
    zip_code VARCHAR(9) NOT NULL,
    passport_number VARCHAR(20) UNIQUE NOT NULL
);

-- Insert values into Passengers table
INSERT INTO Passengers (first_name, last_name, phone, email, address, city, state_abbr, zip_code, passport_number) VALUES
('Paul', 'Nguyen', '111-222-3333', 'paul@oregonstate.edu', '1111 Oregon St', 'Corvallis', 'OR', '97330', 'A11222333'),
('Matt', 'Anderson', '222-333-4444', 'matt@oregonstate.edu', 'B222 Washington St', 'Spokane', 'WA', '99201', '222333444'),
('Steve', 'Rogers', '832-424-8060', 'steve@marvel.com', '14520 Walt St', 'Orlando', 'FL', '32789', 'C334445555');


SET FOREIGN_KEY_CHECKS=1;
COMMIT;

select * from Airports;
select * from Plane_types;
select * from Planes;
select * from Flights;
select * from Passengers_flights;
select * from Passengers;
