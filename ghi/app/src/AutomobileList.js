import React, {useEffect, useState } from "react";

export default function AutomobileList() {
    const [autos, setAutomobile] = useState([])
    const fetchData = async () => {
        const url = "http://localhost:8100/api/automobiles/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAutomobile(data.autos)
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
            <h1>Automobiles</h1>
            <table className="table table-striped table-bordered shadow p-4 mt-4">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                {autos.map(auto => {
                        return (
                            <tr key={auto.id}>
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                                <td>{auto.sold ? 'Yes' : 'No'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
 };
