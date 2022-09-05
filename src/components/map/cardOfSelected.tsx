import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import markerStore from '../../store/markerStore';


const CardOfSelected=()=> {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {markerStore.currentMarker.name}
        </Typography>
        <Typography variant="h5" component="div">
        {markerStore.currentMarker.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {markerStore.currentMarker.phone}
        </Typography>
        <Typography variant="body2">
        {markerStore.currentMarker.email}
      
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export default observer(CardOfSelected) 