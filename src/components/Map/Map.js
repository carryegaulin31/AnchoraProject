import "./Map.css";
import React, { useState } from "react";
import  {Link}  from "react-router-dom";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import mapStyles from "../../mapStyles";
import Data from "../../containers/MapContainer/trials.json";
import Search from "../../components/Map/Search";
import Locate from "../../components/Map/Locate";
import Box from '@material-ui/core/Box';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import HealingIcon from '@material-ui/icons/Healing';



console.log(Data)

//avoid re-renders
const libraries = ["places", "geometry"]
// make the map cover the page
const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};
const center = {
    lat: 45.815010,
    lng: 15.981919,
};
// snazzy maps ---- copy and paste into separate file map styles and export as default
const options = {
    styles: mapStyles,
    // remove default items that come with map 
    disableDefaultUI: true,
    //add individual items that you want
    zoomControl: true,
    scrollwheel: false,
    rotateControl: true


}




// load map
export default function App() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries,

    });




    const [selected, setSelected] = useState(null);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    // this function zoom in when a search is entered
    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(13)
    }, [])





    // this loads page
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Map"


    return (
        // Add Ancora label at top  --- h1 on map --- h2 above map
        <div>


            <Search panTo={panTo} />
            <Locate panTo={panTo} />
            <GoogleMap
                // how zoomed in when map starts
                mapContainerStyle={mapContainerStyle}
                zoom={6} center={center}
                options={options}
                onLoad={onMapLoad}

            >

                {Data.map((trial, index) => (
                    <Marker
                        key={index}

                        //this is the marker title information

                        title={trial.locations[0].facility_name}

                        // this is setting the markers on the map
                        position={{
                            lat: Number(trial.locations[0].lat),
                            lng: Number(trial.locations[0].lng)

                        }}

                        //change the icon
                        icon={{
                            url: "marker.png",
                            /* ADD THIS TO CHANGE SIZE OF CUSTOM MARKER */
                            // scaledSize: new window.google.maps.Size(30, 30)
                        }}
                        // this adds click to marker
                        onClick={() => {
                            setSelected(trial);
                        }}
                    />

                ))}

                {selected && (
                    <InfoWindow className="infoDiv"
                        position={{
                            lat: Number(selected.locations[0].lat),
                            lng: Number(selected.locations[0].lng)
                        }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}


                    >
                        <Box component="span" color="text.primary" m={1} className="infoBox">
                           
                            <div className="infoBox" >
                                <div className="topBanner"><p>ID:{selected.trial_id}</p></div>
                                <h2>Trial Name</h2>
                                <p>{selected.trial_name}</p>
                                <h3>Trial Description</h3>
                                <p>{selected.trial_description
                                ?   selected.trial_description
                                :   "No Description For This Trial"
                                    }</p>
                                <h4>Trial Summary</h4>
                                <p>{selected.trial_summary}</p>
                                <LocalHospitalIcon />
                                <a href={`http://www.google.com/search?q=${selected.trial_name}`} >Learn More</a>
                                <HealingIcon />
                              
                             
                                
                            </div>
                                    
                        </Box>
                    </InfoWindow>)}

            </GoogleMap>
        </div>
    )
};


