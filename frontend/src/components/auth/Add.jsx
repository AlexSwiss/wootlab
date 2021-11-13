// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import CarForm from "./CarForm";

// CreateStudent Component
const AddCar = () => {
const [formValues, setFormValues] =
	useState({ car_model: '', car_year: '', license_plate: '',  max_km: '', max_load_km: '', fuel_type: ''  })
// onSubmit handler
const onSubmit = carObject => {
	axios.post(
'http://localhost:8000/api/car/new',
	carObject)
	.then(res => {
		if (res.status === 200)
		alert('Car successfully added')
		else
		Promise.reject()
	})
	.catch(err => alert('Something went wrong'))
}
	
// Retuern student form
return(
	<CarForm initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize>
	Add Car
	</CarForm>
)
}

// Export CreateStudent Component
export default AddCar
