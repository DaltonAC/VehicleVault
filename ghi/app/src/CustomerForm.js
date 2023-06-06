import React, {useEffect, useState} from "react";

function CreateCustomer() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value);
    }

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}

        data.first_name = first_name
        data.last_name= last_name
        data.address= address
        data.phone_number=phone_number

        const url = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            const newCustomer = await response.json()
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');

        }
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a Customer</h1>
                <form onSubmit={handleSubmit} id="create-customer-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFirstNameChange} placeholder="First_name" required type="text" name="first_name" id="first_name" className="form-control" ></input>
                        <label htmlFor="first_name">First name...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} placeholder="Last_name" required type="text" name="last_name" id="last_name" className="form-control" ></input>
                        <label htmlFor="last_name">Last name...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" ></input>
                        <label htmlFor="address">Address...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePhoneNumberChange} placeholder="Phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" ></input>
                        <label htmlFor="phone_number">Phone number...</label>
                    </div>
                    <button className="btn btn-primary"> Create Customer</button>

                </form>
            </div>
        </div>
        </div>
    )

}

export default CreateCustomer;