/*
Project:    Soul Plane
Team:       Team 107
Partners:   Paul Nguyen, Matt Anderson
File:       Database DML
Date:       2/14/2024
Author:     Paul Nguyen, Matt Anderson
*/

-- NOTE: All values preceded by a :colon indicate variables that will have the appropriate value when processed by backend code

/* Flights */

-- Get all flights 
SELECT flight_id, Flights.plane_id, Plane_Types.type_name AS plane_type, depart_airport_id,
    DepartAirport.airport_name AS depart_airport_name, arrive_airport_id, ArriveAirport.airport_name AS arrive_airport_name,
    depart_time, arrive_time FROM Flights
    JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
    JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id
    JOIN Planes ON Flights.plane_id = Planes.plane_id
    JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id;

-- Get flight by ID
SELECT flight_id, Flights.plane_id, Plane_Types.type_name AS plane_type, depart_airport_id,
    DepartAirport.airport_name AS depart_airport_name, arrive_airport_id, ArriveAirport.airport_name AS arrive_airport_name,
    depart_time, arrive_time FROM Flights
    JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
    JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id
    JOIN Planes ON Flights.plane_id = Planes.plane_id
    JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id
    WHERE Flights.flight_id = :id_from_url;

-- Create a new flight 
INSERT INTO Flights (plane_id, depart_airport_id, arrive_airport_id, depart_time, arrive_time)
    VALUES (:plane_id_dropdown_input, 
    :depart_airport_id_dropdown_input,
    :arrive_airport_id_dropdown_input,
    :depart_time_input,
    :arrive_time_input
    );

-- Update a flight
UPDATE Flights 
    SET depart_airport_id = :depart_airport_id_dropdown_input,
    arrive_airport_id = :arrive_airport_id_dropdown_input,
    depart_time = :depart_time_input,
    arrive_time = :arrive_time_input
    WHERE flight_id = :flight_id_from_form;

-- Delete a flight
DELETE FROM Flights WHERE flight_id = :flight_id_selected_from_browse_flights_page


/* Airports */

-- Get all airports
SELECT * FROM Airports;

-- Get airport by ID 
SELECT * FROM Airports WHERE airport_id = ${req.params.id}

-- Create a new airport
INSERT INTO Airports (airport_name, airport_code, location) 
    VALUES (:airport_name_input, :airport_code_input, :location_input);

-- Update an airport
UPDATE Airports
    SET airport_name = :airport_name_input,
    airport_code = :airport_code_input,
    location = :location_input
    WHERE airport_id = :airport_id_from_form;

-- Delete an airport
DELETE FROM Airports WHERE airport_id = :airport_id_selected_from_browse_airports_page


/* Passengers */

-- Get all passengers
SELECT Passengers.user_id, passenger_id, username, first_name, last_name, email, address, city, state, zipcode, passport_number FROM Passengers 
    LEFT JOIN Users ON Users.user_id = Passengers.user_id;

-- Get passenger by ID
SELECT Passengers.user_id, passenger_id, username, first_name, last_name, email, address, city, state, zipcode, passport_number FROM Passengers 
    LEFT JOIN Users ON Users.user_id = Passengers.user_id;
    WHERE passenger_id = :id_from_url;

-- Create a passenger
INSERT INTO Passengers (first_name, last_name, phone, email, address, city, state_abbr, zip_code, passport_number)
    VALUES (:first_name_input, :last_name_input, :phone_input, :email_input, :address_input, :city_input, :state_abbr_input, :zip_code_input, :passport_number_input);

-- Update a passenger
UPDATE Passengers
    SET first_name = :first_name_input,
    last_name = :last_name_input,
    phone = :phone_input,
    email = :email_input,
    address = :address_input,
    city = :city_input,
    state_abbr = :state_abbr_input,
    zip_code = :zip_code_input,
    passport_number = :passport_number_input
    WHERE passenger_id = :passenger_id_from_form;

-- Delete a passenger
DELETE FROM Passengers WHERE passenger_id = :passenger_id_selected_from_browse_passengers_page

/* Planes */

-- Get all planes
SELECT plane_id, Plane_Types.type_name AS plane_type, 
    Airports.airport_name AS current_airport 
    FROM Planes
    JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id
    LEFT JOIN Airports ON Planes.current_airport_id = Airports.airport_id;

-- Get a plane by ID
SELECT plane_id, Plane_Types.type_name AS plane_type,
    Airports.airport_name AS current_airport FROM Planes
    JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id
    LEFT JOIN Airports ON Planes.current_airport_id = Airports.airport_id
    WHERE plane_id = :plane_id_from_form;

-- Create a new plane
INSERT INTO Planes (plane_type_id, current_airport_id)
    VALUES (:plane_type_dropdown_input, :current_airport_dropdown_input);

-- Update a plane (:current_airport_dropdown_input possibly NULL)
UPDATE Planes
    SET plane_type_id = :plane_id_dropdown_input,
    current_airport_id = :current_airport_dropdown_input
    WHERE plane_id = :plane_id_from_form;

-- Delete a plane
DELETE FROM Planes WHERE plane_id = :plane_id_selected_from_browse_planes_page

/* Plane types */

-- Get all plane types
SELECT * FROM Plane_Types;

-- Get plane type by ID
SELECT * FROM Plane_Types WHERE plane_type_id = :id_from_url;

-- Create a new plane type
INSERT INTO Plane_Types (type_name, capacity, range_in_hrs)
    VALUES (:type_name_input, :capacity_input, :range_in_hrs_input);

-- Update a plane type
UPDATE Plane_Types
    SET type_name = :type_name_input,
    capacity = :capacity_input,
    range_in_hrs = :range_in_hrs_input
    WHERE plane_type_id = :plane_type_id_from_form

-- Delete a plane type
DELETE FROM Plane_Types WHERE plane_type_id = :plane_type_id_selected_from_browse_Plane_Types_page


/* Passengers Flights */

-- Get all flights for each passenger (flight and passengers names loaded from separate queries)
SELECT * FROM Passenger_Flights;

-- Associate a passenger with a flight (M:M relationship addition)
INSERT INTO Passenger_flights (passenger_id, flight_id)
    VALUES (:passenger_dropdown_input, :flight_dropdown_input);

-- Update the relationship between a passenger and a flight (M:M relationship update)
UPDATE Passenger_flights
    SET passenger_id = :passenger_dropdown_input,
    flight_id = :flight_dropdown_input
    WHERE flight_id = :original_flight_id_from_url AND passenger_id = :original_passenger_id_from_url;

-- Dis-associate a passenger with a flight (M:M relationship deletion)
DELETE FROM Passenger_flights 
    WHERE passenger_id = :passenger_id_selected_from_browse_Passenger_flights_page
    AND flight_id = :flight_id_selected_from_browse_Passenger_flights_page
