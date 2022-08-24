
import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import markerStore from '../store/markerStore';
import { Marker as MarkerUtil } from '../utils/marker';
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import Directions from "@mui/icons-material/Directions";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };


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
    const searchMarker = async () => {
      debugger

      markerStore.currentMarker = null
      const nameMarker = inputNameMarker.current?.value;
      await markerStore.SearchMarker(nameMarker)
      debugger
      if (markerStore.currentMarker != null) {
        debugger
        setCenter({ lat: markerStore.currentMarker.lat, lng: markerStore.currentMarker.lng })
        setZoom(13)
      }

    }
    const handleSelect = async () => {

      debugger
      const nameMarker = inputNameMarker.current?.value;
      await markerStore.SearchMarker(nameMarker)
      setCenter({ lat: markerStore.currentMarker.lat, lng: markerStore.currentMarker.lng })
      setZoom(13)
    }
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly MarkerUtil[]>([]);
    const loading = open && options.length === 0;
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
      setOpenDialog(true);
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
       // await sleep(1e3); // For demo purposes.

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
            <Button  variant="contained"
              onClick={handleClickOpen}>
              Add Location
            </Button>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={openDialog}
            >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Modal title
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                  dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                  consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                  magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                  ullamcorper nulla non metus auctor fringilla.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Save changes
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Paper>
        </Grid>
      </Grid>
    );
    }

  export default SimpleMap;

  const markers = markerStore.markers



