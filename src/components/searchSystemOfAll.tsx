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

    return (
        <div id="allBusiness" >
            {/* <AutoComplitSystem/> */}
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
        </div>
    );
}

export default observer(SearchSystemOfAll);