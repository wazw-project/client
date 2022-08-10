import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { System } from '../utils/system';

export default function SystemDetails() {

  const [system, setSystem] = useState<System>();
  const location = useLocation();
  const from:any = location.state;
  useEffect(() => {
    async function getSystem() {
      try {
        debugger;
     
      console.log(from)
        const res = await axios.get(` http://localhost:3333/system/systemById/${from.id}`)
        console.log(res.data);
        setSystem(res.data)      
      } catch (err) {
        console.log(err)
      }
    }
    getSystem();
  }, [from.id]);

  const navigate = useNavigate();
  return (
   
    <>
    {system&&
      <Card sx={{ maxWidth: 2000, alignItems: 'center', marginTop: 2 }}>
        <CardMedia
          component="img"
          height="230"
          image={system?.urlImage}
          alt="ha ha ha"
        />
        <CardContent>
          <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h3" component="div">         
            {system?.description}
          </Typography>
          <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
            {system?.objectName}
          </Typography>
       
            
                    <Typography variant="h5" component="div" color="primary" textAlign="center">
                      {system.email}
                    </Typography>
                    <Typography variant="h6" component="div" textAlign="center">
                   {system.topic}
                    </Typography>
                    {/* <Typography variant="h6" component="div" textAlign="center">
                      duration: {item.duration}
                    </Typography>
                    <Typography variant="h6" component="div" textAlign="center">
                      cost: {item.cost}
                    </Typography>
                    <Typography variant="h6" component="div" textAlign="center">
                      place of meetings:<br />
                      {item.address.number} {item.address.street} ,{item.address.city}
                    </Typography>
                    <Typography variant="h8" component="div" textAlign="center">
                      Contact: 0504168639 between: {item.openingHours}
                    </Typography>
                    <Typography variant="body2">
                      <br />
                    </Typography> */}
                    <Button onClick={() => {
                      debugger
                     // navigate('/UserFormDetails', { state: { service: item } }, { replace: true })
                    }}
                      variant="outlined" size="small">schedule </Button>
               
     
        </CardContent>
        <div style={{ marginRight: 'left' }}></div>
      </Card>}
    </>
  );
}