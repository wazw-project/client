import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Typography from '@mui/material/Typography';
import systemStore from '../../store/systemStore';
const TitleMapLocationUser: React.FC = () => {
    useEffect(() => {
        debugger
        console.log("nnnnnnnnnnnnn")
    }, [])
    return (
        <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h4" component="div">
            search {systemStore.currentSystem && systemStore.currentSystem.topic}s
        </Typography>)
}
export default observer(TitleMapLocationUser)