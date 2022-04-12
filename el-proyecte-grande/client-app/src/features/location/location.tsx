import React, { useEffect, useState } from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import agent from "../../app/api/agent";


interface props{
    address: string
}


export default function Location({address}: props){
    
    useEffect(() => {
        getCoordinates();
        getApiKey();
    })
    const [apiKey, setApiKey] = useState('');
    const [latLng, setLatLng] = useState({lat: 0, lng: 0})
    const getApiKey = async () => {
        setApiKey(await agent.APIKey)
    }
    const getCoordinates = async () => {
        const results = await geocodeByAddress(address);
        setLatLng(await getLatLng(results[0]))
    }
    const lat = latLng.lat;
    const lng = latLng.lng;
    const WrappedMap = withScriptjs(withGoogleMap(() =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: lat, lng: lng }}
    >
        <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
    ))

    if(apiKey === '')
        return null;

    return <div style={{width: '600px', height: '200px'}}>
        <WrappedMap 
        
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}      
            
            />
    </div>
}
