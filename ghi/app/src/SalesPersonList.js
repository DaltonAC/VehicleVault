import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';


function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/salespeople/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(salesperson => {
                        return (
                            <tr key={salesperson.employee_id}>
                                <td>{salesperson.first_name}</td>
                                <td>{salesperson.last_name}</td>
                                <td>{salesperson.employee_id}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalespeopleList;