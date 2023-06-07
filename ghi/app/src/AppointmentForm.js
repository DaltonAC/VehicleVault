import React, { useEffect, useState } from 'react';

export default function AutomobileForm() {

    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date_time, setDateTime] = useState('');
    const [reason, setReason] = useState('');
    const [technician_id, setTechnicianID] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [vins, setVins] = useState([]);

    const fetchData = async () => {
        const url1 = 'http://localhost:8080/api/technicians/';
        const response1 = await fetch(url1);
        if (response1.ok) {
            const data = await response1.json();
            setTechnicians(data.technicians);
        } else {
            console.log("No Getting Tech Data")
        }
        const url2 = 'http://localhost:8100/api/automobiles/';
        const response2 = await fetch(url2);
        if (response2.ok) {
            const data = await response2.json();
            setVins(data.vins);
        } else {
            console.log("Not Getting Vin Data")
        }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {

    const data = {}
    data.vin = vin;
    data.customer = customer;
    data.date_time = date_time;
    data.technician_id = technician_id;
    data.reason = reason;
    // model info


    const url = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setVin('');
      setCustomer('');
      setDateTime('');
      setReason('');
      setTechnicianID('');
    }
  };

    const handleDateTimeChange = (event) => {
        const value = event.target.value;
        setDateTime(value);
  };

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnicianID(value);
    }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Make A Appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input onChange={handleVinChange}
              value={vin}
              placeholder="Vin"
              required type="text"
              name="vin"
              id="vin"
              className="form-control" />
              <label htmlFor="vin">Vin</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleCustomerChange}
              value={customer}
              placeholder="Customer"
              required type="text"
              name="customer"
              id="customer"
              className="form-control" />
              <label htmlFor="customer">Customer Name</label>
            </div>

            <div className="form-floating mb-3">
             <input
                value={date_time}
                placeholder="Date Time"
                required
                type="datetime-local"
                name="date_time"
                id="date_time"
                className="form-control"
                onChange={handleDateTimeChange}/>
            <label htmlFor="date_time">Select Date & Time</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleTechnicianChange}
                value={technician_id}
                required
                name="technician_id"
                id="technician_id"
                className="form-select">
                <option value="">Choose a Technician</option>
                {technicians.map((technician) => (
                  <option
                    key={technician.id}
                    value={technician.id}>
                    {technician.first_name} {technician.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleReasonChange}
              value ={reason}
              placeholder="Reason"
              required type="text"
              name="reason"
              id="reason"
              className="form-control" />
              <label htmlFor="reason">Reason</label>
            </div>

            <button className="btn btn-primary">Create</button>

          </form>
        </div>
      </div>
    </div>
  )
}
