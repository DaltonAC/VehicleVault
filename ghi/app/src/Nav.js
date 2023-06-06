import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">CarCar</NavLink>
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
            <NavLink className="nav-link" to="sales">Sales List</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="sales/create">Create Sale</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="create/salesperson">Create Salesperson</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="salesperson">Salesperson List</NavLink>
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
            <NavLink className="nav-link" to="technicians">Technicians List</NavLink>
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
    // <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    //   <div className="container-fluid">
    //     <NavLink className="navbar-brand" to="/">CarCar</NavLink>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //     <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //     <NavLink className="navbar-brand" to="manufacturers">Manufacturers</NavLink>
    //     <NavLink className="navbar-brand" to="manufacturers/create">Create Manufacturer</NavLink>
    //     <NavLink className="navbar-brand" to="vehicle-models">Vehicle Models</NavLink>
    //     <NavLink className="navbar-brand" to="vehicle-models/create">Create Vehicle Model</NavLink>
    //     <NavLink className="navbar-brand" to="automobiles">Automobiles</NavLink>
    //     <NavLink className="navbar-brand" to="automobiles/create">Create Automobile</NavLink>
    //     <NavLink className="navbar-brand" to="customers">Customers</NavLink>
    //     <NavLink className="navbar-brand" to="customers/create">Create Customer</NavLink>
    //     <NavLink className="navbar-brand" to="appointments">Appointments</NavLink>
    //     <NavLink className="navbar-brand" to="appointments/create">Create Appointment</NavLink>
    //     <NavLink className="navbar-brand" to="sales">Sales List</NavLink>
    //     <NavLink className="navbar-brand" to="sales/create">Create Sale</NavLink>
    //     <NavLink className="navbar-brand" to="salesperson">Salesperson List</NavLink>
    //     <NavLink className="navbar-brand" to="salesperson-history">Salesperson History</NavLink>
    //     <NavLink className="navbar-brand" to="create/salesperson">Create Salesperson</NavLink>
    //     <NavLink className="navbar-brand" to="technicians">Technicians List</NavLink>
    //     <NavLink className="navbar-brand" to="technicians/create">Create Technician</NavLink>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  )
}

export default Nav;
