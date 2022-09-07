import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import markerStore from '../../store/markerStore';
import Man2Icon from '@mui/icons-material/Man2';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailIcon from '@mui/icons-material/Mail';
import Grid from '@mui/material/Grid';

const CardOfSelected: React.FC = () => {
  return (
    <Card sx={{ minWidth: 275,textAlign:'center' }}>

      <CardContent>
        <Typography sx={{ color: '#b2ebf2' }} variant="h4" component="div">
          details:
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid sx={{height:'50%',marginLeft:'5%',marginTop:'3%'}} >
            <Man2Icon />
          </Grid>
          <Grid item >
            <Typography variant="h5" component="div">
              {markerStore.currentMarker.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid sx={{height:'50%',marginLeft:'5%',marginTop:'3%'}} >
            <DescriptionIcon />
          </Grid>
          <Grid item >
            <Typography variant="h5" component="div">
            {markerStore.currentMarker.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid sx={{height:'50%',marginLeft:'5%',marginTop:'3%'}} >
            <PhoneIphoneIcon />
          </Grid>
          <Grid item >
            <Typography variant="h5" component="div">
            {markerStore.currentMarker.phone}
            </Typography>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid sx={{height:'50%',marginLeft:'5%',marginTop:'3%'}} >
            <MailIcon />
          </Grid>
          <Grid item >
            <Typography variant="h5" component="div">
            {markerStore.currentMarker.email}
            </Typography>
          </Grid>
        </Grid>
      
      </CardContent>
    
    </Card>
  );
}
export default observer(CardOfSelected)