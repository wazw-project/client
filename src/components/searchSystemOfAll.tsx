import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import systemStore from '../store/systemStore';
import { System } from '../utils/system';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import AutoComplitSystem from './system/autoComplitSystem';
import Grid from '@mui/material/Grid';
import requestStore from '../store/request';
import userStore from '../store/userStore';

const SearchSystemOfAll: React.FC = () => {
    const navigate = useNavigate();

    async function getAllSystems() {
        debugger
        try {
            await systemStore.getAllSystems();
        } catch (error) { console.log(error); }
    }

    useEffect(() => {
        debugger
  
        getAllSystems();
    }, [])

   const addSystem=()=>{
       if(!userStore.user){
           navigate('/login')
       }
       else{
           navigate('/systems')
       }
   }

    return (
        <div id="allBusiness" >
            <Typography variant="h4" gutterBottom>
                search for one product do you want
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Stack padding={3} direction="row" spacing={5} sx={{ '& .MuiCard-root': { m: 5 }, flexWrap: 'wrap' }} >
                        {systemStore.allSystems && systemStore.allSystems.map((system: System) =>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt="system"
                                    height="140"
                                    image={system.urlImage}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {system.topic}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {system.objectName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {system.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" onClick={() => {
                                        debugger
                                        systemStore.currentSystem = system;
                                        navigate(`/Map/hello/${system.urlName}`)
                                    }}
                                    >see the places of this system</Button>
                                </CardActions>
                            </Card>)}
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <Grid item xs={6} md={8}>
                        <AutoComplitSystem />
                    </Grid>
                    <Grid item xs={8} md={6}>
                        <Button variant="contained" onClick={addSystem}>
                            add system
                        </Button>
                    </Grid>
                </Grid>
            </Grid>


        </div>
    );
}

export default observer(SearchSystemOfAll);