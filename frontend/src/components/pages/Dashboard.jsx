import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from "axios";
import userContext from '../../context/userContext';
import Cars from './Cars'
import Users from './Users'


function Dashboard () {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState(0);

    useEffect(() => {
        if(!userData.user)
            history.push("/login");
            setInterval(() => {
                function getPos(){
                    const currrentPosition = navigator.geolocation.getCurrentPosition(function(position) {
                        //getting the Longitude from the location json
                        const getLongitude =
                        JSON.stringify(position.coords.longitude);
                  
                      //getting the Latitude from the location json
                      const getLatitude =
                        JSON.stringify(position.coords.latitude);
    
                        setLongitude(getLongitude);
                        setLatitude(getLatitude);
    
                        const req = {latitude: getLatitude, longitude: getLongitude} 
    
                        console.log(req)
                        const id = userData.user._id
                        console.log(id)
    
                        const res = axios.patch(`http://localhost:8000/api/auth/update/${id}`, req);
                        console.log(res)
                //console.log(getPos())
                      });    
                }
                getPos();
            }, 6000)
            
    }, []);                
    return (
        <div>
            {userData.user ? (
                <h1>Welcome {userData.user.name}</h1>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Login</Link>
                </>
            )}
            <h3>List of Cars</h3>
            <Cars />
            <h3>Choose a User to Track</h3>
            <Users />
        </div>
    );
}
 
export default Dashboard;