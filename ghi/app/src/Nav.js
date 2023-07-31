import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">VehicleVault</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <div className="d-flex flex-wrap">
          <li className="nav-item">
            <NavLink className="nav-link" to="manufacturers">Manufacturers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="manufacturers/create">Create Manufacturer</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="vehicle-models">Vehicle Models</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="vehicle-models/create">Create Vehicle Model</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="automobiles">Automobiles</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="automobiles/create">Create Automobile</NavLink>
          </li>
        </div>
        <div className="d-flex flex-wrap">
          <li className="nav-item">
            <NavLink className="nav-link" to="customers">Customers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="customers/create">Create Customer</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="sales">Sales</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="sales/create">Create Sale</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="salesperson/create">Create Salesperson</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="salesperson">Salespeople</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="salesperson-history">Salesperson History</NavLink>
          </li>
        </div>
        <div className="d-flex flex-wrap">
          <li className="nav-item">
            <NavLink className="nav-link" to="appointments">Appointments</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="appointments/create">Create Appointment</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="technicians">Technicians</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="technicians/create">Create Technician</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="service-history">Service History</NavLink>
          </li>
        </div>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Nav;
