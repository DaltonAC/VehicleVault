import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import VehicleModelList from "./VehicleModelList";
import VehicleModelForm from "./VehicleModelForm";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";
import SalesForm from "./SalesForm";
import SalesList from "./SalesList";
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import SalesPersonForm from "./SalesPersonForm";
import SalesPersonHistory from "./SalesPersonHistory";
import SalesPersonList from "./SalesPersonList";
import AppointmentList from "./AppointmentList";
import AppointmentForm from "./AppointmentForm";
import ServiceHistory from "./ServiceHistory";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="vehicle-models" element={<VehicleModelList />} />
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
          <Route path="vehicle-models/create" element={<VehicleModelForm />} />
          <Route path="automobiles" element={<AutomobileList />} />
          <Route path="automobiles/create" element={<AutomobileForm />} />
          <Route path="technicians" element={<TechnicianList />} />
          <Route path="technicians/create" element={<TechnicianForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments/create" element={<AppointmentForm />} />
          <Route path="service-history" element={<ServiceHistory />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/create" element={<CustomerForm />} />
          <Route path="sales" element={<SalesList />} />
          <Route path="sales/create" element={<SalesForm />} />
          <Route path="salesperson" element={<SalesPersonList />} />
          <Route path="salesperson/create" element={<SalesPersonForm />} />
          <Route path="salesperson-history" element={<SalesPersonHistory />} />
          <Route path="sales" element={<SalesList />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/create" element={<CustomerForm />} />
          <Route path="salesperson-history" element={<SalesPersonHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
