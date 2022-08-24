import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import markerStore from '../store/markerStore';
import { Marker as MarkerUtil } from '../utils/marker';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SeachAndAddMarker from './seachAndAddMarker'
import MapStore from '../store/mapStore';
import { observer } from 'mobx-react';
import CardSolution from './cardSolution';
import TitleMapLocation from './titleMapLocation';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const SimpleMap: React.FC = (props: any) => {

  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<readonly MarkerUtil[]>([]);
  const loading = open && options.length === 0;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],

    };
  };


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
          center={{ lat: MapStore.currentMap.center.lat, lng: MapStore.currentMap.center.lng }}
          zoom={MapStore.currentMap.zoom}
          options={getMapOptions}
        >
          {markerStore.markers.map(m => (
            <Marker
              lat={m.lat}
              lng={m.lng}
              name={m.name}
              color={m.color}
            />
          ))}
        </GoogleMapReact>
      </Grid>
      <Grid item xs={6} md={4}>
       <TitleMapLocation/>   
        <SeachAndAddMarker/>
        {MapStore.currentCard && <CardSolution/>}        
      </Grid>
    </Grid>
  );
}

export default observer(SimpleMap);

const markers = markerStore.markers