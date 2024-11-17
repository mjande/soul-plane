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
                <Link to='/airports'>Airports</Link>
                <Link to='/Flights'>Flights</Link>
                <Link to='/PassengerFlights'>Passenger Flights</Link>
                <Link to='/Passengers'>Passengers</Link>
                <Link to='/Planes'>Planes</Link>
                <Link to='/plane-types'>Plane Types</Link>
            </div>
        </div>
    )
}

export default Nav
