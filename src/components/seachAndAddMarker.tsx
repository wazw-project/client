/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MapStore from '../store/mapStore';
import { observer } from 'mobx-react';

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
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
export default observer(serrchAndAddMarker)
