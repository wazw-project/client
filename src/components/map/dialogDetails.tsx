import React, { useState } from 'react';
import './Marker.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import markerStore from '../../store/markerStore';
import { observer } from 'mobx-react';

const DialogDetails: React.FC = () => {

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const handleClickOpen = () => {
      setOpenDialog(true);
    };
    const handleCloseDialog = () => {
      setOpenDialog(false);
  
    };
    const nameOfLocation = (e: any) => {
      setMarkerName(e.target.title)
      handleClick(e)
    }
    const detailsOfLocation = (e: any) => {
      markerStore.SetcurrentMarker(e.target.title)
      console.log(markerStore.currentMarker.name)
      handleClickOpen()
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [markersName, setMarkerName] = useState<string>("")
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const idr = open ? 'simple-popover' : undefined;

return(
    <>
    {markerStore.currentMarker &&

    <Dialog
          // fullScreen={fullScreen}
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            marker: {markerStore.currentMarker.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              lat:   {markerStore.currentMarker.location.lat}
            </DialogContentText>
            <DialogContentText>
              lng:  {markerStore.currentMarker.location.lng}
            </DialogContentText>
            <DialogContentText>
              color:  {"red"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
       
            <Button onClick={handleCloseDialog} autoFocus>
              close
            </Button> 
          </DialogActions>
        </Dialog>}
        </>
)
}
export default observer(DialogDetails)