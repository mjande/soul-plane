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

-- Create Plane_Types Table
DROP TABLE IF EXISTS Plane_Types;
CREATE TABLE Plane_Types (
    plane_type_id INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    range_in_hrs INT NOT NULL
);

-- Create Planes Table
DROP TABLE IF EXISTS Planes;
CREATE TABLE Planes (
    plane_id INT PRIMARY KEY AUTO_INCREMENT,
    plane_type_id INT NOT NULL,
    current_airport_id INT,
    FOREIGN KEY (plane_type_id) REFERENCES Plane_Types(plane_type_id)
        ON DELETE RESTRICT,
    FOREIGN KEY (current_airport_id) REFERENCES Airports(airport_id)
);

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

-- Create Passenger_flights Table
DROP TABLE IF EXISTS Passenger_flights;
CREATE TABLE Passenger_flights (
    passenger_id INT NOT NULL,
    flight_id INT NOT NULL,
    PRIMARY KEY (passenger_id, flight_id),
    FOREIGN KEY (passenger_id) REFERENCES Passengers(passenger_id)
        ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id)
        ON DELETE CASCADE
);

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

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
