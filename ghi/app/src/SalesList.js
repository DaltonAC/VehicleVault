import React, {useState, useEffect} from 'react';

function SalesList() {
    const[sales, setSales] = useState([]);

    const fetchData= async () => {
        const url = 'http://localhost:8090/api/sales/'
        const response = await fetch(url); {
            const data = await response.json();
            setSales(data.sales);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Automobile</th>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale=> {
                        return (
                            <tr key={sale.automobile}>
                                <td>{sale.automobile}</td>
                                <td>{sale.salesperson}</td>
                                <td>{sale.customer}</td>
                                <td>{sale.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalesList;