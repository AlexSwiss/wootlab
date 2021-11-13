import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link, generatePath, useParams } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from "axios";
import userContext from '../../context/userContext';
import { Table, Button } from 'react-bootstrap';



function Home () {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/car/all`)
            .then((response) => {
                setAPIData(response.data.data);
            })
            console.log(setAPIData)
    }, []);                
    return (
        <div>
            <Table singleLine>
             <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Plate Number</th>
                <th>User ID</th>
                </tr>
            </thead>

                <tbody>
                {APIData.map((data) => {
                    return (

                        <tr>
                        <td>1</td>
                        <td>
                        <Link to={`/car/${data._id}`}>
                            { data.car_model }
                         </Link>
                        </td> 
                        <td>{data.license_plate}</td>
                        <td>{data.user_id}</td>
                      </tr>
                       )})}

                </tbody>
            </Table>
        </div>
    );
}
 
export default Home;