export default function DeleteFlightForm() {
    return (
        <div id="delete">
            <form id="deleteFlight" method="post">
            <legend>
                <strong>Delete Flight</strong>
            </legend>
            <fieldset className="fields">
                <span>Are you sure you wish to delete the following? </span>
                <span>Flight ID: 1</span>
                <span>Departure Airport: Portland International Airport</span>
                <span>Arrival Airport: Seattle-Tacoma International Airport</span>
                <span>Plane: Plane #3 (Embraer 135)</span>
                <span>Depart Time: February 5, 2024, at 14:30:00 </span>
                <span>Arrival Time: February 11, 2024, at 02:15:00</span>
            </fieldset>
            <div className="buttons-container">
                <input className="btn" type="submit" value="Delete Flight" />
                <input className="btn" type="button" value="Cancel" />
            </div>
            </form>
        </div>    
    )
}
