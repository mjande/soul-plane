export interface FlightView {
  flight_id: number,
  plane_id: number, 
  plane_type: string,
  depart_airport_name: string,
  arrive_airport_name: string,
  depart_time: Date,
  arrive_time: Date
}

export interface Flight {
    flight_id: number,
    plane_id: number,
    depart_airport_id: number,
    arrive_airport_id: number,
    depart_time: string,
    arrive_time: string,
}
