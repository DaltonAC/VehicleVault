import React, { useEffect, useState } from 'react';

export default function VehicleModelForm() {

    const [name, setName] = useState('');
    const [picture_url, setPicture] = useState('');
    const [manufacturer_id, setManufacturerID] = useState('');
    const [manufacturers, setManufacturers] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {}
    data.name = name;
    data.manufacturer_id = manufacturer_id;
    data.picture_url = picture_url;


    const url = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setName('');
      setPicture('');
      setManufacturerID('');
    }
  };


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturerID(value);
    }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Vehicle Model</h1>
          <form onSubmit={handleSubmit} id="create-vehiclemodel-form">

            <div className="form-floating mb-3">
              <input onChange={handleNameChange}
              value={name}
              placeholder="Model Name"
              required type="text"
              name="name"
              id="name"
              className="form-control" />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handlePictureChange}
              value ={picture_url}
              placeholder="Picture URL"
              required type="text"
              name="picture_url"
              id="picture_url"
              className="form-control" />
              <label htmlFor="picture_url">Picture URL</label>
            </div>

            <div className="mb-3">
              <select
                onChange={handleManufacturerChange}
                value={manufacturer_id}
                required
                name="manufacturer_id"
                id="manufacturer_id"
                className="form-select">
                <option value="">Choose a Manufacturer</option>
                {manufacturers.map((manufacturer) => (
                  <option
                    key={manufacturer.id}
                    value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}
