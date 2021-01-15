import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import styles from "./Map.css";


const reduceSize = trials => {
    let visited = [];
    for (let trial of trials) {
        // console.log(trial)
        if (trial.locations && trial.locations[0]) {
            if (visited.length === 0) {
                if (trial.locations[0].country) {
                    visited.push(trial);
                }
            } else {
                if (trial.locations[0].country) {
                    let flag = false;
                    for (let visit of visited) {
                        if (
                            visit.locations[0].country ===
                            trial.locations[0].country
                        ) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag === false) {
                        visited.push(trial);
                    }
                }
            }
        }
    }
    if (visited.length === 1 && trials.length > 1) {
        let mid = Math.floor(trials.length / 2);
        if (mid > 0 && mid < trials.length) {
            visited.push(trials[mid]);
        }

        let random = Math.floor(Math.random() * mid);

        if (random > 0 && random < mid) {
            visited.push(trials[random]);
        }

        random = Math.floor(
            Math.random() * (trials.length - 1 - (mid + 1) + (mid + 1))
        );

        if (random > 0 && random < trials.length) {
            visited.push(trials[random]);
        }
        visited.push(trials[trials.length - 1]);
    }
    return visited;
};

function MapContainer(props) {
    reduceSize(props.trials);
    return (
        <Map
            key={props.trials && props.trials.length}
            google={props.google}
            center={{
                lat:
                    props.trials && props.trials.length > 0
                        ? Number(
                              props.trials[0].locations.length !== 0 &&
                                  props.trials[0].locations[
                                      props.selectedLocation
                                          ? props.selectedLocation
                                          : 0
                                  ].lat
                          )
                        : 39.2904,
                lng:
                    props.trials && props.trials.length > 0
                        ? Number(
                              props.trials[0].locations.length !== 0 &&
                                  props.trials[0].locations[
                                      props.selectedLocation
                                          ? props.selectedLocation
                                          : 0
                                  ].lng
                          )
                        : -76.6122
            }}
            style={styles}
            onReady={(_, map) => {
                if (props.trials && props.trials.length >= 1) {
                    const bounds = new window.google.maps.LatLngBounds();
                    reduceSize(props.trials).forEach(trial => {
                        if (trial.locations[0]) {
                            bounds.extend(
                                new window.google.maps.LatLng(
                                    trial.locations[0].lat,
                                    trial.locations[0].lng
                                )
                            );
                        }
                    });
                    map.fitBounds(bounds);
                    if (props.trialDetails) {
                        map.setZoom(13);
                    }
                }
            }}
            onCenterChanged={(_, map) => {
                if (props.trialDetails) map.setZoom(13);
            }}
            onRecenter={(_, map) => {
                if (props.trialDetails) map.setZoom(13);
            }}
        >
            {props.otherLocations
                ? props.trials[0].locations.map((location, index) => {
                      return (
                          <Marker
                              key={index}
                              title={
                                  props.trials[0].locations[
                                      props.selectedLocation
                                          ? props.selectedLocation
                                          : 0
                                  ].facility_name +
                                  " - " +
                                  location.city
                              }
                              name={
                                  props.trials[0].locations[
                                      props.selectedLocation
                                          ? props.selectedLocation
                                          : 0
                                  ].facility_name +
                                  " - " +
                                  location.city
                              }
                              position={{
                                  lat: location.lat,
                                  lng: location.lng
                              }}
                              icon={{
                                  url: "marker.png"
                              }}
                          >
                          </Marker>
                      );
                  })
                : props.trials.map((trial, index) => {
                      if (
                          trial.locations[
                              props.selectedLocation
                                  ? props.selectedLocation
                                  : 0
                          ]
                      ) {
                          return (
                              <Marker
                                  key={index}
                                  title={
                                      trial.locations[
                                          props.selectedLocation
                                              ? props.selectedLocation
                                              : 0
                                      ].facility_name
                                  }
                                  name={
                                      trial.locations[
                                          props.selectedLocation
                                              ? props.selectedLocation
                                              : 0
                                      ].facility_name
                                  }
                                  position={{
                                      lat:
                                          trial.locations[
                                              props.selectedLocation
                                                  ? props.selectedLocation
                                                  : 0
                                          ].lat,
                                      lng:
                                          trial.locations[
                                              props.selectedLocation
                                                  ? props.selectedLocation
                                                  : 0
                                          ].lng
                                  }}
                                  icon={{
                                      url: "marker.png"
                                  }}
                              >
                              </Marker>
                          );
                      } else {
                          return null;
                      }
                  })}
        </Map>
    );
}

// you need to create new API from google console 
// https://developers.google.com/maps/gmp-get-started#enable-api-sdk

export default GoogleApiWrapper({
    apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
  })(MapContainer)