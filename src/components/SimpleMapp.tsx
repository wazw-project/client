
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
import { Marker as MarkerUtil } from '../utils/marker';
import { ClickAwayListener } from '@mui/material';
import * as locales from '@mui/material/locale';
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import Directions from "@mui/icons-material/Directions";
import { useNavigate } from "react-router";

const mapStyles = {
  width: '20%',
  height: '90%'
};
interface Film {
  title: string;
  year: number;
}

const handleClick = () => {
  console.log("gruhguirhoiughr")
}
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}


const SimpleMap: React.FC = (props: any) => {
  const [locale, setLocale] = useState<string>("");
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
  const [center, setCenter] = useState({ lat: 31.0461, lng: 34.8516, });
  const [zoom, setZoom] = useState(8);
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

        {/* <Autocomplete
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
            options={options}
            loading={loading}  
            // onChange={(event: any, newValue: string) => {
            //   setLocale(newValue);
            // }} 
           
            //onClick={console.log("egeg")}
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
          /> */}

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
          {/* <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          /> */}
          {/* <Autocomplete
                id="asynchronous-demo"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.title === value.title
                }
                getOptionLabel={(option) => option.title}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search for a location "
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              /> */}
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
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
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
      </Grid>

    </Grid>
  );
}

export default SimpleMap;

const markers = markerStore.markers



