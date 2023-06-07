import React, {useEffect, useState } from "react";

export default function AppointmentList() {
    const [appointments, setAppointments] = useState([])
    const fetchData = async () => {
    const url = "http://localhost:8080/api/appointments/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments)
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleButtonClick = async (e, buttonID, id) => {
        // Perform the desired update based on the buttonId
        e.preventDefault();

        if (buttonID === "cancel") {
            const data = {
                "status":"Canceled"
            }

            const cancelURL = `http://localhost:8080/api/appointments/${id}/cancel/`;
            const fetchConfig = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                  },
                }
            await fetch(cancelURL,fetchConfig);

        } else if (buttonID === "finish") {
            const data = {
                "status":"Finished"
            }

            const finishURL = `http://localhost:8080/api/appointments/${id}/finish/`;
            const fetchConfig = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                  },
                }
            await fetch(finishURL,fetchConfig)
        }
    }


    return (
        <div>
            <h1>Service Appointments</h1>
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
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                {appointments.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.vip}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date_time}</td>
                                <td>{appointment.date_time}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                <button className="btn btn-primary bg-warning" onClick={(e) => handleButtonClick(e,'cancel', [appointment.id])}>Cancel</button>
                                <button className="btn btn-primary bg-success" onClick={(e) => handleButtonClick(e,'finish', [appointment.id])}>Finish</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
 };
