import React, {useEffect, useState } from "react";

export default function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments)
                setFilteredAppointments(data.appointments);
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchResults = appointments.filter((appointment) =>
          appointment.vin.includes(search)
        );
        setFilteredAppointments(searchResults);
      };

    return (
        <div>
            <h1>Service History</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <input
            type="text"
            className="form-control"
            placeholder="Search by VIN"
            value={search}
            onChange={handleSearch} />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
        </form>
            <table className="table table-striped table-bordered shadow p-4 mt-4">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>VIP Status</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                     {filteredAppointments.map(appointment => {
                        return (
                        <tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>{appointment.vip}</td>
                        <td>{appointment.customer}</td>
                        <td>{appointment.date_time}</td>
                        <td>{appointment.date_time}</td>
                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.status}</td>
                        </tr>
                        )
                        })}
                </tbody>
            </table>
        </div>
    )
 };
