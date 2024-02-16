import { Link } from 'react-router-dom'
// import logo from '../../assets/~path'
import './Nav.scss'

function Nav() {

    return (
        <div className='navbar'>
            {/* <Link to="/" className='navLogo'>
                <img src={logo} alt="logo" />
            </Link> */}
           <div className='miscNavButtons'>
                <Link to='/Airports'>Airports</Link>
                <Link to='/Flights'>Flights</Link>
                <Link to='/PassengerFlights'>Passenger Flights</Link>
                <Link to='/Passengers'>Passengers</Link>
                <Link to='/Planes'>Planes</Link>
                <Link to='/PlaneTypes'>Plane Types</Link>
            </div>
        </div>
    )
}

export default Nav