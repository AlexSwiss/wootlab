import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";

const CarForm = (props) => {

console.log(props);
return (
	<div className="form-wrapper">
	<Formik {...props} >
		<Form>
		<FormGroup>
			<Field name="car_model" type="text"
				className="form-control" placeholder="Enter Car Model"  />
			<ErrorMessage
			name="car_model"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
		<FormGroup>
			<Field name="car_year" type="text"
				className="form-control" placeholder="Enter Car Year"   />
			<ErrorMessage
			name="car_year"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
        <FormGroup>
			<Field name="license_plate" type="text"
				className="form-control" placeholder="Enter Car Plate Number"  />
			<ErrorMessage
			name="license_plate"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
		<FormGroup>
			<Field name="max_km" type="text"
				className="form-control" placeholder="Enter Max Kilometers"   />
			<ErrorMessage
			name="max_km"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
        <FormGroup>
			<Field name="max_load_km" type="text"
				className="form-control" placeholder="Enter Max Load (Km)"  />
			<ErrorMessage
			name="car_year"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
        <FormGroup>
			<Field name="fuel_type" type="text"
				className="form-control" placeholder="Enter Car Fuel Type"  />
			<ErrorMessage
			name="car_year"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
		<Button variant="danger" size="lg"
			block="block" type="submit">
			{props.children}
		</Button>
		</Form>
	</Formik>
	</div>
);
};

export default CarForm;
