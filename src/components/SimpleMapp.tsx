
import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import markerStore from '../store/markerStore';
import { height } from '@mui/system';
import {Marker as MarkerUtil} from '../utils/marker';
const mapStyles = {
  width: '20%',
  height: '90%'
};
interface Film {
  title: string;
  year: number;
}
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const SimpleMap: React.FC = (props: any) => {
  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],

    };
  };
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly MarkerUtil[]>([]);
  const loading = open && options.length === 0;
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
  const [center, setCenter] = useState({ lat: 31.0461,lng: 34.8516, });
  const [zoom, setZoom] = useState(11);
  return (

      <Grid container spacing={2} height={592}>
        <Grid item xs={6} md={8}>
          <GoogleMapReact

            bootstrapURLKeys={{ key: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw' }}
            defaultCenter={center}
            defaultZoom={zoom}
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
          <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h4" component="div">
            here you can search  location business of your system
          </Typography>

          <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asynchronous"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>

      </Grid>
  );
}

export default SimpleMap;

const markers = markerStore.markers



