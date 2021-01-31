import React from 'react'
import MyLocationIcon from '@material-ui/icons/MyLocation';






//locate function (tracks your location) --- try and put in separate file
function Locate({ panTo }) {
    return (
      <button className="locate" 
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
         panTo({
           lat: position.coords.latitude,
           lng: position.coords.longitude,
         })
        },
          () => null,
          );
      }}
      >
        
        <MyLocationIcon  alt="compass - locate me" />
      </button>
    );
  }
  
  
  export default Locate