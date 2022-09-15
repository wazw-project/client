/* eslint-disable react/jsx-no-undef */
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
import { useParams, useSearchParams } from 'react-router-dom';
import mapStore from '../../store/mapStore';
import { useLocation } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Login from '../login/Login';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}


const Map: React.FC = (props: any) => {
  const [openLogin, setOpenLogin] = React.useState(false);
  const search = useLocation().search;
  const fromEmail = new URLSearchParams(search).get('fromEmail');
  const { id } = useParams();
  const { name } = useParams();
  useEffect(() => {
    debugger
    getAllForComponent()
  }, [])
  const getAllForComponent = async () => {
    if (fromEmail) {
      debugger
      userStore.loginFrom = `/Map/${name}/${id}`
      if (!userStore.user)
        setOpenLogin(true);
    }
    await getSystemById()
    await getManagers()
    await getMarker();
  }
  const getSystemById = async () => {
    await systemStore.getSystemById(String(id))
    console.log(systemStore.currentSystem._id)
  }
  const getManagers = async () => {

    if (userStore.user) {
      await ManagerStore.getManagersByUserIdAndSystemId(userStore.user._id, systemStore.currentSystem._id)
    }
  }
  async function getMarker() {
    try {
      if (systemStore.currentSystem) {
        console.log(systemStore.currentSystem._id)
        await markerStore.getAllMarkerForSystem(systemStore.currentSystem._id);
      }
    } catch (error) { console.log(error); }
  }
  type directionResult = google.maps.DirectionsResult;
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<readonly MarkerUtil[]>([]);
  const loading = open && options.length === 0;
  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    }
  };
  const [lat, setLat] = useState<number>(mapStore.yourLocation.center.lat);
  const [lng, setLng] = useState<number>(mapStore.yourLocation.center.lng);
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    getLocationlatLng()

  }, [lat, lng]);
  const getLocationlatLng = async () => {
    debugger;
    await getLocationNameByLatLng()
  }
  useEffect(() => {
    debugger
    getLocation()

  }, []);


  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      await navigator.geolocation.getCurrentPosition((position) => {
        setStatus("");
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        MapStore.yourLocation.center.lat = position.coords.latitude
        MapStore.yourLocation.center.lng = position.coords.longitude
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  const getLocationNameByLatLng = async () => {

    await Geocode.setApiKey('AIzaSyBub3Ojwq9cNp4jhvTEkbrE21An_U8Cv5k')
    await Geocode.enableDebug();
    await Geocode.fromLatLng(lat.toString(), lng.toString()).then(
      async (response: any) => {
        const address = await response.results[0].formatted_address;

        requestStore.currentRequestAddressesName = address;
        console.log(address);
      },
      (error) => {
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

  const handleClose = () => {
    setOpenLogin(false);
  };

  return (
    <Grid container spacing={2} height={662}>
      {openLogin &&
        <Dialog
          open={openLogin}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            for see your requests you need login!
          </DialogTitle>
          <DialogActions>
            <Login />
          </DialogActions>
        </Dialog>}
      <Grid item xs={6} md={8}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_APY_KEY || '' }}
          center={{ lat: MapStore.yourLocation.center.lat, lng: MapStore.yourLocation.center.lng }}
          zoom={MapStore.yourLocation.zoom}
          options={getMapOptions}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => MapStore.map = map}
        >
          <Marker
            lat={MapStore.yourLocation.center.lat}
            lng={MapStore.yourLocation.center.lng}
            name={'your location'}
            color={'80cbc4'}
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

        {(!ManagerStore.currentManager || ManagerStore.currentManager.role !== "1") &&
          <>
            {(requestStore.currentRequestAddressesName) &&
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
    </Grid >
  );
}

export default observer(Map);

const markers = markerStore.markers