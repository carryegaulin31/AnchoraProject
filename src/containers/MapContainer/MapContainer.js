// import React from "react";
import Map from "../../components/Map/Map"
import React, { useState, useEffect } from 'react'

import Data from "./trials.json";

const MapContainer = () => {
    return (
        <div>
            <Map trials={Data}/> 
        </div>
    )
}

export default MapContainer
