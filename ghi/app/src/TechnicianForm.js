import React, { useEffect, useState } from 'react';

export default function TechnicianForm() {

    const [employee_id, setEmployeeID] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
  useEffect(() => {
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {}
    data.employee_id = employee_id;
    data.first_name = first_name;
    data.last_name = last_name;


    const url = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setEmployeeID('');
      setFirstName('');
      setLastName('');
    }
  };

    const handleEmployeeIDChange = (event) => {
        const value = event.target.value;
        setEmployeeID(value);
    }
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add Technician</h1>
          <form onSubmit={handleSubmit} id="create-technician-form">
            <div className="form-floating mb-3">
              <input onChange={handleEmployeeIDChange}
              value={employee_id}
              placeholder="employee_id"
              required type="text"
              name="employee_id"
              id="employee_id"
              className="form-control" />
              <label htmlFor="employee_id">Employee ID</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFirstNameChange}
              value={first_name}
              placeholder="First Name"
              required type="text"
              name="first_name"
              id="first_name"
              className="form-control" />
              <label htmlFor="first_name">First Name</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleLastNameChange}
              value ={last_name}
              placeholder="Last Name"
              required type="text"
              name="last_name"
              id="last_name"
              className="form-control" />
              <label htmlFor="last_name">Last Name</label>
            </div>

            <button className="btn btn-primary btn-warning btn-lg">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}
