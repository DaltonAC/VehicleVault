import React, {useEffect, useState } from "react";

export default function VehicleModelList() {
    const [models, setVehicleModel] = useState([])
    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setVehicleModel(data.models)
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
            <h1>Vehicle Models</h1>
            <table className="table table-striped table-bordered shadow p-4 mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                {models.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td> <img src={model.picture_url}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
 };
