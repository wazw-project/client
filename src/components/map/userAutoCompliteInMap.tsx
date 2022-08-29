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
import swal from 'sweetalert';
import RequestToMarker from './RequestToMarker';
import Geocode from "react-geocode";
import requestStore from '../../store/request';
import TitleMapLocationUser from './titleMapLocationUser';

const UserAutoCompliteInMap: React.FC = () => {
  

return(
 <>
  <TitleMapLocationUser/>
 <Grid container spacing={2}>
    <Grid item xs={8}>
    <AutoComplete/>
  </Grid>
  <Grid item xs={4}>
  <RequestToMarker />
  </Grid>
  </Grid>
    
    </>
)
}
export default observer(UserAutoCompliteInMap)