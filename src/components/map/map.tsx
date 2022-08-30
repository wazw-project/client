import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Grid from '@mui/material/Grid';
import markerStore from '../../store/markerStore';
import { Marker as MarkerUtil } from '../../utils/marker';
import SearchAndAddMarker from './seachAndAddMarker'
import MapStore from '../../store/mapStore';
import { observer } from 'mobx-react';
import CardSolution from './cardSolution';
import TitleMapLocation from './titleMapLocation';
import systemStore from '../../store/systemStore';
import RequestForSystem from './requestForSystem';
import userStore from '../../store/userStore';
import ManagerStore from '../../store/managerStore';
import UserAutoCompliteInMap from './userAutoCompliteInMap';
import Geocode from "react-geocode";
import requestStore from '../../store/request';


function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}



const Map: React.FC = (props: any) => {
  async function getMarker() {
    try {
      await markerStore.getAllMarkerForSystem(systemStore.currentSystem._id);
    } catch (error) { console.log(error); }
  }
  useEffect(() => {
    debugger
    getManagers()
    getMarker();
  }, [])

  const getManagers = async () => {
    debugger
    if (userStore.user) {
      await ManagerStore.getManagersByUserIdAndSystemId(userStore.user._id, systemStore.currentSystem._id)

      console.log(ManagerStore.currentManager.role)

    }
  }

  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<readonly MarkerUtil[]>([]);
  const loading = open && options.length === 0;

  
  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
      getLocationNameByLatLng()
  }, [lat,lng]);
  
  useEffect(() => {
    debugger
      getLocation()
  }, []);


  const getLocation = () => {
    if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
    } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
            setStatus("");
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            MapStore.yourLocation.center.lat=position.coords.latitude
            MapStore.yourLocation.center.lng=position.coords.longitude
        }, () => {
            setStatus('Unable to retrieve your location');
        });
    }
}

const getLocationNameByLatLng = () => {
  debugger
  Geocode.setApiKey("AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw");
  Geocode.enableDebug();
  Geocode.fromLatLng(lat.toString(),lng.toString()).then(
      (response: any) => {
          const address = response.results[0].formatted_address;
          requestStore.currentRequestAddressesName = address;
          console.log(address);
      },
      (error: any) => {
          console.error(error);
      }
  );
}


  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...markers]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);





  return (

    <Grid container spacing={2} height={592}>
      <Grid item xs={6} md={8}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw' }}
          center={{ lat: MapStore.yourLocation.center.lat, lng: MapStore.yourLocation.center.lng }}
          zoom={MapStore.yourLocation.zoom}
          options={getMapOptions}
        >
          <Marker
            lat={MapStore.yourLocation.center.lat}
            lng={MapStore.yourLocation.center.lng}
            name={'your location'}
            color={'yellow'}
          />
          {markers && markerStore.markers.map(m => (
            <Marker
              lat={m.location.lat}
              lng={m.location.lng}
              name={m.name}
              color={"red"}
            />
          ))}
        </GoogleMapReact>
      </Grid>
      <Grid item xs={6} md={4}>
        
        {(!ManagerStore.currentManager || ManagerStore.currentManager.role === "0") &&
        <>
        {requestStore.currentRequestAddressesName&&
          <UserAutoCompliteInMap />}
          </>}
        {ManagerStore.currentManager && ManagerStore.currentManager.role === "1" &&
          <>
          <TitleMapLocation />
            <SearchAndAddMarker />
            {MapStore.currentCard && <CardSolution />}
            <RequestForSystem />

          </>}

      </Grid>
    </Grid>
  );
}

export default observer(Map);

const markers = markerStore.markers