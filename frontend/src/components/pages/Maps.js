// src/App.js
import React, {component, useEffect, useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import GoogleMap from 'google-map-react';


const mapStyles = {
  width: '80%',
  height: '80%'
}

const markerStyle = {
  height: '50px',
  width: '50px',
  marginTop: '-50px'
}

const imgStyle = {
  height: '80%'
}


const Marker = ({ title }) => (
  <div style={markerStyle}>
    <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
    <h3>{title}</h3>
  </div>
);

function Maps() {
  const {userData} = useContext(UserContext);
  const [longitude, setLongitude] = useState();

  const history = useHistory();
  useEffect(() => {
    if(!userData.user)
        history.push("/login");
    console.log(userData.user.latitude)
    longitude = userData.user.longitude
    const long = setLongitude(longitude);
    console.log(long)
        
}, []);  
 
    return (
      <div >
        
        <GoogleMap
          style={mapStyles}
          bootstrapURLKeys={{ key: 'AIzaSyB2t7EqYwCLbpGhk2_Thex-NQLuZsG7YCQ' }}
          center={{ lat: 9.075402532859744, lng: 7.416220513128576 }}
          zoom={14}
        >
          <Marker
          title={'Current Location'}
          lat={9.075402532859744}
          lng={7.416220513128576}
        >
          </Marker>
        </GoogleMap>
        <h1>Car</h1>
      </div>
    )
  }

export default Maps;