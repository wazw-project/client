import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
const TitleMapLocationUser: React.FC = () => {
    return (<Typography sx={{ textAlign: 'center' }} gutterBottom variant="h4" component="div">
        here you can search product or add marker fot system
    </Typography>)
}
export default observer(TitleMapLocationUser)