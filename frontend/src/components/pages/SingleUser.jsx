import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import UserContext from '../../context/userContext';
import axios from "axios";
import userContext from '../../context/userContext';
import { Table } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';


const mapStyles = {
    width: '800%',
    height: '800%',
    position: 'relative'
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
  

function Home () {
    const [res, setAPIData] = useState([]);
    const { id } = useParams();


    useEffect(() => {
       axios.get(`http://localhost:8000/api/auth/user/one/${id}`)
            .then((response) => {
                setAPIData(response.data.data);
            })
    }, []);                
    return (
        <div style={{height: '80px', width: '80px'}}>
            <GoogleMapReact
          style={mapStyles}
          bootstrapURLKeys={{ key: 'AIzaSyB2t7EqYwCLbpGhk2_Thex-NQLuZsG7YCQ' }}
          center={{ lat: 9.075402532859744, lng: 7.416220513128576 }}
          zoom={14}
        >
          <Marker
          title={'Current Location'}
          lat={res.latitude}
          lng={res.longitude}
        >
          </Marker>
        </GoogleMapReact>
        </div>
    );
}
 
export default Home;