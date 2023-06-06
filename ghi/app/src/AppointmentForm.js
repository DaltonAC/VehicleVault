import React, { useEffect, useState } from 'react';

export default function AutomobileForm() {

    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date_time, setDateTime] = useState('');
    const [vip, setVIP] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technician_id, setTechnicianID] = useState('');
    const [technicians, setTechnicians] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        } else {
            console.log("issue")
        }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {}
    data.vin = vin;
    data.customer = customer;
    data.vip = vip;
    data.date_time = `${date}T${time}:00+00:00`;
    data.technician_id = technician_id;
    data.reason = reason
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
      setVIP('');
      setDateTime('');
      setReason('');
      setTechnicianID('');
      setDate('');
      setTime('');
    }
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleTimeChange = (event) => {
    const value = event.target.value;
    setTime(value);
  };
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleVIPChange = (event) => {
        const value = event.target.value;
        setVIP(value);
    }

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const handleDateTimeChange = (event) => {
        const value = event.target.value;
        setDateTime(value);
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
                value={date}
                placeholder="Date"
                required
                type="datetime-local"
                name="date"
                id="date"
                className="form-control"
                onChange={handleDateChange}/>
            <label htmlFor="date">Select Date</label>
            </div>

<div className="form-floating mb-3">
  <input
    value={time}
    placeholder="Time"
    required
    type="time"
    name="time"
    id="time"
    className="form-control"
    onChange={handleTimeChange}
  />
  <label htmlFor="time">Select Time</label>
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
{console.log(`${date}T${time}:00+00:00`)}
            <div className="form-floating mb-3">
              <input onChange={handleReasonChange}
              value ={reason}
              placeholder="Reason"
              required type="text"
              name="reasom"
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
