import React, {useEffect, useState} from "react"


export default function CreateSale() {
    const[sale, setSale] = useState ([]);
    const[automobile, setAutomobile] = useState ([]);
    const[salesperson, setSalesperson] = useState ([]);
    const[customer, setCustomer] = useState ([]);
    const[price, setPrice] = useState ([]);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {}
        data.sale = sale
        data.automobile = automobile
        data.salesperson = salesperson
        data.customer = customer
        data.price = price

        const url = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await (url, fetchConfig);
        if (response.ok) {
            const newSale = await response.json()
            setSale('');
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
        }
    }

    const handleAutomobileChange = (event) => {
            const value = event.target.value;
            setAutomobile(value);
        }
    const handleSalespersonChange = (event) => {
            const value = event.target.value;
            setSalesperson(value);
        }
    const handleCustomerChange = (event) => {
            const value = event.target.value;
            setCustomer(value);
        }
    const handlePriceChange = (event) => {
            const value = event.target.value;
            setPrice(value);
        }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
            if (response.ok) {
                const data = await response.json();
                setSale(data.sale)
            }
    }

    useEffect( () => {
        fetchData()
    }, [])

    return(
        <>
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Record a new sale</h1>
                <form onSubmit={handleSubmit} id="create-sale-form">
                    <div className="mb-3">
                    <select onChange={handleAutomobileChange} value={automobile} required name="automobile" id="automobile_id" className="form-select">
                        <option value="">Choose an automobile...</option>
                        {automobile.map(automobile => {
                                return (
                                <option key={automobile.href} value={automobile.id}>
                                    {automobile.name}
                                </option>
                                );
                            })}
                    </select>
                    </div>
                    <div className="mb-3">
                    <select onChange={handleCustomerChange} value={customer} required name="Customer" id="customer_id" className="form-select">
                        <option value="">Choose a customer...</option>
                        {customer.map(customer => {
                                return (
                                <option key={caches.href} value={customer.id}>
                                    {customer.name}
                                </option>
                                );
                            })}
                    </select>
                    </div>
                    <div className="mb-3">
                    <select onChange={handleSalespersonChange} value={salesperson} required name="Salesperson" id="salesperson_id" className="form-select">
                        <option value="">Choose a salesperson...</option>
                        {salesperson.map(salesperson => {
                                return (
                                <option key={salesperson.href} value={salesperson.id}>
                                    {salesperson.name}
                                </option>
                                );
                            })}
                    </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={price} onChange={handlePriceChange} placeholder="price" required type="text" name="price" id="price" className="form-control"/>
                        <label htmlFor="price">Price...</label>
                    </div>
                    <button className="btn btn-primary"> Create Sale</button>

                </form>
                </div>
        </div>
        </div>
    </>
    )

}