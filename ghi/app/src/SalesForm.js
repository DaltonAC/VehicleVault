import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


function SalesForm() {
  const navigate=useNavigate();
  const [autovin, setAutovin] = useState('');
  const [salesPerson, setSalesperson] = useState('');
  const [customer, setcustomer] = useState('')
  const [price, setPrice] = useState('')
  const [autovins, setAutoVins] = useState([]);
  const [salesPeople, setSalesPeople] = useState([]);
  const [customers, setCustomers] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data ={}
    data.automobile = autovin
    data.salesperson = salesPerson
    data.customer = customer
    data.price = price

    const salesURL = 'http://localhost:8090/api/sales/'
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': "application/json",
      },
    };
    const response = await fetch(salesURL, fetchConfig);
    if(response.ok) {
      const newSale = await response.json();

      setAutovin('')
      setSalesperson('');
      setcustomer('');
      setPrice('');
      navigate('/sales');
    }
  }
    const handleVinChange = (event) => {
      const value = event.target.value;
      setAutovin(value);
    }
    const handlePriceChange = (event) => {
      const value = event.target.value;
      setPrice(value);
    }
    const handleSalespersonChange = (event) => {
      const value = event.target.value;
      setSalesperson(value);
    }
    const handleCustomerChange = (event) => {
      const value = event.target.value;
      setcustomer(value);
    }

  const AutomobileData = async () => {
    const url = 'http://localhost:8090/api/autos/';
    const response = await fetch(url);
    if(response.ok) {
      const data = await response.json();
      setAutoVins(data.unsold_autos);
    }
  }

  const SalespersonData = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);
    if(response.ok) {
      const data = await response.json();
      setSalesPeople(data.salespeople);
    }
  }

  const CustomerData = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url);
    if(response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  }

  useEffect(() => {
    AutomobileData();
    SalespersonData();
    CustomerData();
  }, []);

  return (
    <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Record a new sale</h1>
        <form onSubmit={handleSubmit} id="create-sale-form">
        <div className="mb-3">
          <select onChange={handleVinChange} value={autovin} required name="vin" id="vin" className="form-select">
            <option value="">Select an Automobile VIN...</option>
            {autovins.map(auto => {
                return (
                    <option value={auto.vin} key={auto.vin}>
                        {auto.vin}
                    </option>
                );
              })}
          </select>
        </div>
        <div className="mb-3">
          <select onChange={handleSalespersonChange} value={salesPerson} required name="" id="salesperson" className="form-select">
            <option value="">Select a Salesperson...</option>
            {salesPeople.map(person => {
                return (
                    <option value={person.id} key={person.id}>
                        {person.employee_id}
                    </option>
                );
              })}
          </select>
        </div>
        <div className="mb-3">
          <select onChange={handleCustomerChange} value={customer} required name="" id="customer" className="form-select">
            <option value="">Select a Customer...</option>
            {customers.map(cust => {
                return (
                    <option value={cust.id} key={cust.id}>
                        {cust.first_name} {cust.last_name}
                    </option>
                );
              })}
          </select>
        </div>
        <div className="form-floating mb-3">
          <input placeholder="price" onChange={handlePriceChange} value={price} required type="number" name="price" id="price" className="form-control"/>
          <label htmlFor="price">Enter price of vehicle...</label>
        </div>
          <button className="btn btn-primary">Create new sale</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default SalesForm
