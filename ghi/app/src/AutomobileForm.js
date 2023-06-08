import React, { useEffect, useState } from 'react';

export default function AutomobileForm() {

    const [vin, setVin] = useState('');
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [model_id, setModelID] = useState('');
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
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
    data.color = color;
    data.year = year;
    data.model_id = model_id;
    // model info


    const url = 'http://localhost:8100/api/automobiles/';
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
      setColor('');
      setYear('');
      setModelID('');

    }
  };

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleModelChange = (event) => {
        const value = event.target.value;
        setModelID(value);
    }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an Automobile to Inventory</h1>
          <form onSubmit={handleSubmit} id="create-vehiclemodel-form">
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
              <input onChange={handleYearChange}
              value={year}
              placeholder="Year"
              required type="number"
              name="year"
              id="year"
              className="form-control" />
              <label htmlFor="year">Year</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleColorChange}
              value ={color}
              placeholder="Color"
              required type="text"
              name="color"
              id="color"
              className="form-control" />
              <label htmlFor="color">Color</label>
            </div>

            <div className="mb-3">
              <select
                onChange={handleModelChange}
                value={model_id}
                required
                name="model_id"
                id="model_id"
                className="form-select">
                <option value="">Choose a Model</option>
                {models.map((model) => (
                  <option
                    key={model.id}
                    value={model.id}>
                    {model.name}
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
