import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import markerStore from '../../store/markerStore';
import { Marker as MarkerUtil } from '../../utils/marker';
import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import MapStore from '../../store/mapStore';
import { observer } from 'mobx-react';
import swal from 'sweetalert';
import EditMarker from './editMarker'

const CardSolution: React.FC = () => {

  const deleteMarker = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this marker!",
      icon: "warning",
      // buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          MapStore.setCardOfSolution(false)
          markerStore.removeMarkers(markerStore.currentMarker._id)
          // markerStore.currentMarker = null;
          swal("Poof! Your marker deleted!", {
            icon: "success",
          });
          MapStore.setZoom(8)
          MapStore.setCenter(31.0461, 34.8516,)

        } else {
          swal("Your marker is safe!");

        }
      });
  }
  const updateMarker = () => {
    //add update marker function
  }
  return (<> {MapStore.currentCard &&

    <Card sx={{ maxWidth: 450, marginTop: "5%" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://images.macrumors.com/t/Mzdy96yMLLhSy2dj7m3VXwkazns=/400x0/article-new/2021/04/Google-maps-feaure.jpg?lossy"
        alt="green iguana"
      />
      <CardContent>
        {markerStore.currentMarker.name&&
        <Typography gutterBottom variant="h5" component="div">
        {markerStore.currentMarker.name}
        </Typography>}
        {markerStore.currentMarker.description &&
          <Typography gutterBottom variant="h5" component="div">
            {markerStore.currentMarker.description}
          </Typography>}
          {markerStore.currentMarker.notes&&
        <Typography variant="body2" color="text.secondary">
   {markerStore.currentMarker.notes}
        </Typography>}
        {markerStore.currentMarker.phone&&
        <Typography variant="body2" color="text.secondary">
         {markerStore.currentMarker.phone}
        </Typography>}
        {markerStore.currentMarker.email&&
        <Typography variant="body2" color="text.secondary">
        {markerStore.currentMarker.email}
        </Typography>}
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={deleteMarker} startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <div style={{marginLeft:'5%'}}>
        <EditMarker/>
        </div>
        {/* <Button variant="contained" onClick={updateMarker} sx={{ marginRight: 3 }} endIcon={<SendIcon />}>
          Edit
        </Button> */}
      </CardActions>
    </Card>
  }
  </>)
}
export default observer(CardSolution)