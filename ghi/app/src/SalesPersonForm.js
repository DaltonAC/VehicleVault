import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function CreateSalesperson() {
    const navigate=useNavigate();
    const[formData, setFormData] = useState(
        {
            first_name: '',
            last_name: '',
            employee_id: '',
        }
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                first_name: '',
                last_name: '',
                employee_id: '',
            });
            navigate('/salesperson');
        }
    }

    const handleFormChange = (event) => {
            const value = event.target.value;
            const inputName = event.target.name;

            setFormData({
                ...formData,
                [inputName]: value
            });
        }
        
    return(
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create Salesperson</h1>
                <form onSubmit={handleSubmit} id="create-salesperson-form">

                    <div className="form-floating mb-3">
                        <input value={formData.first_name} onChange={handleFormChange} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control"/>
                        <label htmlFor="name">First Name...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={formData.last_name} onChange={handleFormChange} placeholder="last_name" required type="text" name="last_name" id="last_name" className="form-control"/>
                        <label htmlFor="name">Last Name...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={formData.employee_id} onChange={handleFormChange} placeholder="employee_id" required type="text" name="employee_id" id="employee_id" className="form-control"/>
                        <label htmlFor="name">Employee ID...</label>
                    </div>

                    <button className="btn btn-primary"> Create </button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default CreateSalesperson
