import React from 'react';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
const TitleMapLocation: React.FC = () => {
    return (
    <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h4" component="div">
        here you can search location business of your system
    </Typography>)
}
export default observer(TitleMapLocation)