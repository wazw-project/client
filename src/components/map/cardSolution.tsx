import React from 'react';
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
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import closet from '../../style/closet.png'
import mapStore from '../../store/mapStore';
import { useState } from 'react';
import { useEffect } from 'react';
import iconX from '../../style/x.png'
const CardSolution: React.FC = () => {
  const [flag, setFlag] = useState(true);
  const closeCard = () => {
    setFlag(false)
    mapStore.setCardOfSolution(false)
  }
  useEffect(() => {
    debugger
    setFlag(true)
    console.log(flag)
    
}, []);


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
  return (<> {MapStore.currentCard && flag &&

    <Card sx={{ maxWidth: 300, marginTop: "5%", marginLeft: "20%", marginBottom: "5%" }}>
      {/* <CardMedia
  
        component="img"
        height="200"
        image={closet}
        alt="green iguana"
      /> */}
      <CardContent>
   
        <img style={{width:"20px", marginLeft:"90%"}} onClick={closeCard} src={iconX}/>

        {markerStore.currentMarker.name &&

          <Typography gutterBottom variant="h5" component="div">
            <PersonIcon />
            {markerStore.currentMarker.name}
          </Typography>}

        {markerStore.currentMarker.description &&
          <Typography gutterBottom variant="h5" component="div">
            <DescriptionIcon />
            {markerStore.currentMarker.description}
          </Typography>}
        {markerStore.currentMarker.notes &&
          <Typography variant="body2" color="text.secondary">
            <SpeakerNotesIcon />
            {markerStore.currentMarker.notes}
          </Typography>}
        {markerStore.currentMarker.phone &&
          <Typography variant="body2" color="text.secondary">
            <PhoneAndroidRoundedIcon />
            {markerStore.currentMarker.phone}
          </Typography>}
        {markerStore.currentMarker.email &&
          <Typography variant="body2" color="text.secondary">
            <MailRoundedIcon />
            {markerStore.currentMarker.email}
          </Typography>}
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={deleteMarker} startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <div style={{ marginLeft: '5%' }}>
          <EditMarker />
        </div>
      </CardActions>
    </Card>
  }
  </>)
}
export default observer(CardSolution)