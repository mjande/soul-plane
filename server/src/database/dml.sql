/*
Project:    Soul Plane
Team:       Team 107
Partners:   Paul Nguyen, Matt Anderson
File:       Database DML
Date:       2/14/2024
Author:     Paul Nguyen, Matt Anderson
*/

-- NOTE: All values preceded by a :colon indicate variables that will have the appropriate value when processed by backend code

/* Queries to populate dropdowns for creating and updating other entities */

-- Get plane IDs and plane types for plane id dropdown
SELECT Planes.plane_id, Plane_types.type_name FROM Planes
    JOIN Plane_types ON Planes.plane_type_id = Plane_types.plane_type_id;

-- Get all airport IDs and names to populate Departing Airport, Arriving Airport, and Current Airport dropdowns
SELECT airport_id, airport_name FROM Airports;

-- Get all plane type IDs and type_names for plane type dropdown
SELECT plane_type_id, type_name FROM Plane_types;

-- Get passenger IDs, and first and last names for passenger dropdown
SELECT passenger_id, first_name, last_name FROM Passengers;

-- Get flight_id and departure and arrival airports for flight dropdown
SELECT Flights.flight_id, DepartAirport.airport_name AS "Departure Airport", ArriveAirport.airport_name AS "Arrival Airport" FROM Flights
    JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
    JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id;


/* Flights */

-- Get all flights 
SELECT flight_id, Flights.plane_id, Plane_types.type_name AS "Plane Type", DepartAirport.airport_name AS "Departure Airport", ArriveAirport.airport_name AS "Arrival Airport", depart_time, arrive_time FROM Flights
    JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
    JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id
    JOIN Planes ON Flights.plane_id = Planes.plane_id
    JOIN Plane_types ON Planes.plane_type_id = Plane_types.plane_type_id;

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

-- Create a new airport
INSERT (airport_name, airport_code, location) 
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
SELECT * FROM Passengers;

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
SELECT plane_id, Plane_types.type_name AS "Plane Type", Airports.airport_name AS "Current Airport" FROM Planes
    JOIN Plane_types ON Planes.plane_type_id = Plane_types.plane_type_id
    JOIN Airports ON Planes.current_airport_id = Airports.airport_id;

-- Create a new plane
INSERT INTO Planes (plane_type_id, current_airport_id)
    VALUES (:plane_type_dropdown_input, :current_airport_dropdown_input);

-- Update a plane 
UPDATE Planes
    SET plane_type_id = :plane_id_dropdown_input,
    current_airport_id = :current_airport_dropdown_input
    WHERE plane_id = :plane_id_from_form;

-- Update a plane to maintenance status by setting its current airport to NULL
UPDATE Planes
    SET current_airport_id = NULL
    WHERE plane_id = :plane_id_from_form;

-- Delete a plane
DELETE FROM Planes WHERE plane_id = :plane_id_selected_from_browse_planes_page

/* Plane types */

-- Get all plane types
SELECT * FROM Plane_types;

-- Create a new plane type
INSERT INTO Plane_types (type_name, capacity, range_in_hrs)
    VALUES (:type_name_input, :capacity_input, :range_in_hrs_input);

-- Update a plane type
UPDATE Plane_types
    SET type_name = :type_name_input,
    capacity = :capacity_input,
    range_in_hrs = :range_in_hrs_input
    WHERE plane_type_id = :plane_type_id_from_form

-- Delete a plane type
DELETE FROM Plane_types WHERE plane_type_id = :plane_type_id_selected_from_browse_plane_types_page


/* Passengers Flights */

-- Get all flights for each passenger
SELECT Passengers.first_name, Passengers.last_name, DepartAirport.airport_name, ArriveAirport.airport_name, Flights.depart_time, Flights.arrive_time FROM Passengers_flights
    JOIN Passengers ON Passengers_flights.passenger_id = Passengers.passenger_id
    JOIN Flights ON Passengers_flights.flight_id = Flights.flight_id
    JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
    JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id;

-- Associate a passenger with a flight (M:M relationship addition)
INSERT INTO Passengers_flights (passenger_id, flight_id)
    VALUES (:passenger_dropdown_input, :flight_dropdown_input);

-- Update the relationship between a passenger and a flight (M:M relationship update)
UPDATE Passengers_flights
    SET passenger_id = :passenger_dropdown_input,
    flight_id = :flight_dropdown_input;

-- Dis-associate a passenger with a flight (M:M relationship deletion)
DELETE FROM Passengers_flights 
    WHERE passenger_id = :passenger_id_selected_from_browse_passengers_flights_page
    AND flight_id = :flight_id_selected_from_browse_passengers_flights_page
