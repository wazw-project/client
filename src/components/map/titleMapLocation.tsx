import React from 'react';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
const TitleMapLocation: React.FC = () => {
    return (
    <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h4" component="div">
         location of your system
    </Typography>)
}
export default observer(TitleMapLocation)