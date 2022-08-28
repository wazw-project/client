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
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


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
                                        systemStore.currentSystem = system;
                                        navigate(`/Map`)
                                    }}
                                    >see the places of this system</Button>
                                </CardActions>
                            </Card>)}
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <AutoComplitSystem />
                </Grid>
            </Grid>


        </div>
    );
}

export default observer(SearchSystemOfAll);