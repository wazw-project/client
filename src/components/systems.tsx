import React, { useContext, useEffect,useState } from 'react';
import axios from 'axios';
import { System } from '../utils/system';
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { padding, style } from "@mui/system";
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const Systems: React.FC = () => {
    const [systems, setSystems] = useState<System[]>([]);
    const navigate = useNavigate();

    async function getSystems() {
        try {
            const managerId='62f263ea1729335c6aff4480';
            const res = await axios.get(`http://localhost:3333/system/${managerId}`);
            let tempList = await res.data;
            console.log(tempList[0]._id)
            setSystems(tempList);
        } catch (error) { console.log(error); }
    }
    useEffect(() => {
        debugger;
        getSystems();
    }, [])

    return (
        <div id="allBusiness" >
            <Typography gutterBottom variant="h2" component="div" sx={{ textAlign: 'center', padding: '10px', }}>All systems</Typography>
            <Stack padding={3} direction="row" spacing={5} sx={{ '& .MuiCard-root': { m: 5 }, flexWrap: 'wrap' }} >
                <Button variant="contained">add system</Button>
                {systems && systems.map((system:System) =>
                    <Card >
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
                            <Button variant="contained" onClick={() => navigate('/systemDetails', { state: { id: system._id } })}>see the system</Button>
                        </CardActions>
                                                       
                    </Card>
                )}
            </Stack>
        </div>
    )
}
export default Systems