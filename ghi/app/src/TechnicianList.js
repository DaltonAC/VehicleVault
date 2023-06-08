import React, {useEffect, useState } from "react";

export default function TechnicianList() {
    const [technicians, setTechnicians] = useState([])

    const fetchData = async () => {
        const url = "http://localhost:8080/api/technicians/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setTechnicians(data.technicians)
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <h1>Technician List</h1>
            <table className="table table-striped table-bordered shadow p-4 mt-4">
                <thead>
                    <tr className="table-warning">
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                {technicians.map(technician => {
                        return (
                            <tr key={technician.id}>
                                <td>{technician.employee_id}</td>
                                <td>{technician.first_name}</td>
                                <td>{technician.last_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
 };
