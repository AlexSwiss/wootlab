import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from "axios";
import userContext from '../../context/userContext';
import { Table } from 'react-bootstrap';



function Home () {
    const [res, setAPIData] = useState([]);
    const { id } = useParams();


    useEffect(() => {
       axios.get(`http://localhost:8000/api/car/single/${id}`)
            .then((response) => {
                setAPIData(response.data.data);
            })
    }, []);                
    return (
        <div>
            <Table singleLine>
             <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Plate Number</th>
                </tr>
            </thead>

                <tbody>
               
                        <tr>
                        <td>1</td>
                        <td>{res.car_model}</td>
                        <td>{res.license_plate}</td>
                      </tr>

                </tbody>
            </Table>
        </div>
    );
}
 
export default Home;