/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import markerStore from '../../store/markerStore';
import { Marker as MarkerUtil } from '../../utils/marker';
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import Directions from "@mui/icons-material/Directions";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MapStore from '../../store/mapStore';
import { observer } from 'mobx-react';
import AutoComplete from './AutoComplite';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import userStore from '../../store/userStore';
import systemStore from '../../store/systemStore';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const serrchAndAddMarker: React.FC = (props: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<readonly MarkerUtil[]>([]);
  const loading = open && options.length === 0;
  const inputNameMarker = useRef<HTMLInputElement>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openDialog, setOpenDialog] = useState(false);
  const inputName = useRef<HTMLInputElement>();
  const inputDescription = useRef<HTMLInputElement>();
  const inputPhone = useRef<HTMLInputElement>();
  const inputEmail = useRef<HTMLInputElement>();
  const inputNotes = useRef<HTMLInputElement>();

  const handleSelect = async () => {
    debugger;
    const nameMarker = inputNameMarker.current?.value;
    await markerStore.SearchMarker(nameMarker)
    MapStore.setCenter(markerStore.currentMarker.lat, markerStore.currentMarker.lng)
    MapStore.setZoom(13)
    MapStore.setCardOfSolution(true)
  }
  const searchMarker = async () => {
    markerStore.currentMarker = null
    const nameMarker = inputNameMarker.current?.value;
    await markerStore.SearchMarker(nameMarker)
    debugger
    if (markerStore.currentMarker != null) {
      debugger
      MapStore.setCenter(markerStore.currentMarker.lat, markerStore.currentMarker.lng)
      MapStore.setZoom(13)
      MapStore.setCardOfSolution(true)
    }
  }
  const handleClickOpen = () => {
    setOpenDialog(true);
    getLocation();
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...markerStore.markers]);
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

  const saveMarker = () => {
    const newMarker: any = {
      "manager_id": userStore.user._id,
      "system_id": systemStore.currentSystem._id,
      "location": {
        "lat": markerStore.markerToAdd.location.lat,
        "lng": markerStore.markerToAdd.location.lng,
        "name": inputName.current?.value,
        "color": "red"
      },
      "description": inputDescription.current?.value,
      "name": inputName.current?.value,
      "notes": inputNotes.current?.value,
      "phone": inputPhone.current?.value,
      "email": inputEmail.current?.value
    }
    markerStore.addMarker(newMarker);
  }


  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  const getLocation = () => {
    debugger
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus("");
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };

  return (
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
      <Button variant="contained" onClick={handleClickOpen}>
        add Marker
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <React.Fragment>
              <Grid item xs={4}>
                <TextField inputRef={inputName} id="filled-basic" label="name" variant="filled" />
              </Grid>
              <Grid item xs={4}>
                <TextField inputRef={inputDescription} id="filled-basic" label="description" variant="filled" />
              </Grid>
              <Grid item xs={4}>
                <TextField inputRef={inputPhone} id="filled-basic" label="phone" variant="filled" />
              </Grid>
              <Grid item xs={4}>
                <TextField inputRef={inputEmail} id="filled-basic" label="email" variant="filled" />
              </Grid>
              <Grid item xs={4}>
                <TextareaAutosize
                  // inputRef={inputNotes}
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="notes"
                  style={{ width: 200 }}
                />
              </Grid>
              <Grid item xs={4}>
                <div className="App">
                  <button onClick={getLocation}>Get Location</button>
                  <h1>Coordinates</h1>
                  <p>{status}</p>
                  {lat && <p>Latitude: {lat}</p>}
                  {lng && <p>Longitude: {lng}</p>}
                </div>
              </Grid>
              <Grid container spacing={2} height={592}>
                <Grid item xs={6} md={8}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw' }}
                    center={{ lat: lat&&lat, lng: lng&&lng }}
                    zoom={20}
                    options={getMapOptions}
                  >
                    <Marker
                      lat={lat && lat}
                      lng={lng && lng}
                      name={'aa'}
                      color={'red'}
                    />
                  </GoogleMapReact>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <AutoComplete />
              </Grid>
            </React.Fragment>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveMarker} autoFocus>
            <IconButton type="button" sx={{ p: "10px" }} aria-label="save">
              <SaveIcon />
            </IconButton>
            save
          </Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
export default observer(serrchAndAddMarker)
