import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import requestStore from '../../store/request';
import systemStore from '../../store/systemStore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Typography from '@mui/material/Typography';
import { wrap } from 'module';
import Grid from '@mui/material/Grid';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import AirplayRoundedIcon from '@mui/icons-material/AirplayRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

const RequestForSystem = () => {
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };


    async function getAllRequest() {
        debugger
        try {
            await requestStore.getRequestForSystem(systemStore.currentSystem._id);
        } catch (error) { console.log(error); }
    }
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = async (id: string | undefined) => {
        if (id == null) {
            id = ""
        }
        await requestStore.getRequestById(id)
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    useEffect(() => {
        debugger
        getAllRequest();
    }, [])
    return (<>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
        >

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <PersonPinIcon />
                </ListItemIcon>
                <ListItemText primary="request add location" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {requestStore.request &&
                        requestStore.request.map((r) => (
                            <ListItemButton key={r._id} sx={{ pl: 4 }}>
                                <ListItemIcon  >
                                    <AddLocationIcon />
                                </ListItemIcon >
                                <ListItemText primary={r.firstName + " " + r.lastName} onClick={() => { handleClickOpen(r._id) }} />
                            </ListItemButton>))}
                </List>
            </Collapse>
        </List>



        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                request details
            </DialogTitle>
            {requestStore.currentRequest &&
                <DialogContent>         
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item >
                            <AccountCircleRoundedIcon />
                        </Grid>
                        <Grid item >
                            <Typography variant="h6" gutterBottom component="div">
                                {requestStore.currentRequest.firstName + " "+requestStore.currentRequest.lastName}
                              
                            </Typography>
                        </Grid>
                        </Grid>   
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item >
                            <LocalPhoneRoundedIcon/>
                        </Grid>
                        <Grid item >
                            <Typography variant="h6" gutterBottom component="div">
                                {requestStore.currentRequest.phone }
                              
                            </Typography>
                        </Grid>
                        </Grid>  
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item >
                            <MailOutlineRoundedIcon/>
                        </Grid>
                        <Grid item >
                            <Typography variant="h6" gutterBottom component="div">
                                {requestStore.currentRequest.email }
                              
                            </Typography>
                        </Grid>
                        </Grid>  
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item >
                            <AirplayRoundedIcon/>
                        </Grid>
                        <Grid item >
                            <Typography variant="h6" gutterBottom component="div">
                                {requestStore.currentRequest.display_name }
                              
                            </Typography>
                        </Grid>
                        </Grid>  
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item >
                            <DescriptionRoundedIcon/>
                        </Grid>
                        <Grid item >
                            <Typography variant="h6" gutterBottom component="div">
                                {requestStore.currentRequest.notes }
                              
                            </Typography>
                        </Grid>
                        </Grid>  
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item >
                            <LocationOnRoundedIcon/>
                        </Grid>
                        <Grid item >
                            <Typography variant="h6" gutterBottom component="div">
                                {requestStore.currentRequest.notes }
                              
                            </Typography>
                        </Grid>
                        </Grid>  
                </DialogContent>}
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>


    </>)
}
export default RequestForSystem

function key(key: any): React.MouseEventHandler<HTMLAnchorElement> | undefined {
    throw new Error('Function not implemented.');
}
