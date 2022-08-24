
import React, { useState, useEffect,useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import markerStore from '../store/markerStore';
import { Marker as MarkerUtil } from '../utils/marker';
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import Directions from "@mui/icons-material/Directions";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const SimpleMap: React.FC = (props: any) => {
  const inputNameMarker = useRef<HTMLInputElement>();
  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],

    };
  };
  const [center, setCenter] = useState({ lat: 31.0461, lng: 34.8516, });
  const [zoom, setZoom] = useState(8);
  const searchMarker= async ()=>{
    debugger
   
    markerStore.currentMarker=null
    const nameMarker= inputNameMarker.current?.value;
    await markerStore.SearchMarker(nameMarker)
    debugger
    if(markerStore.currentMarker!=null){    
      debugger
      setCenter({lat:markerStore.currentMarker.lat,lng:markerStore.currentMarker.lng})
      setZoom(13)
    }
    
  }
  const handleSelect= async ()=>{
  
    debugger
    const nameMarker= inputNameMarker.current?.value;
    await markerStore.SearchMarker(nameMarker)
      setCenter({lat:markerStore.currentMarker.lat,lng:markerStore.currentMarker.lng})
      setZoom(13)
  }
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
 
  return (

    <Grid container spacing={2} height={592}>
      <Grid item xs={6} md={8}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw' }}
          center={center}
          zoom={zoom}
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
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 420,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <Menu />
          </IconButton>         
          <Autocomplete 
           
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true)

            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            onSelect={handleSelect}
            options={options}
            loading={loading}
            
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asynchronous"
                inputRef={inputNameMarker}
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
          <IconButton onClick={searchMarker} type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <Directions />
          </IconButton>
          <Button
            variant="contained"
          >
            Add Location
          </Button>
        </Paper>


        <Card sx={{ minWidth: 275,marginTop:'10%' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          hthjtjw
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

      </Grid>

    </Grid>
  );
}

export default SimpleMap;

const markers = markerStore.markers



