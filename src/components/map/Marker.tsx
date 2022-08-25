import React, { useState } from 'react';
import '../../style/Marker.css';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import markerStore from '../../store/markerStore';


const Marker = (props: any) => {
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
  const { color, name, id } = props;
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
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
        onMouseLeave={nameOfLocation}
        onClick={detailsOfLocation}
      />
      <div className="pulse" />
      <Popover
        id={idr}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{markersName}</Typography>
      </Popover>


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
              lat:   {markerStore.currentMarker.lat}
            </DialogContentText>
            <DialogContentText>
              lng:  {markerStore.currentMarker.lng}
            </DialogContentText>
            <DialogContentText>
              color:  {markerStore.currentMarker.color}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
       
            <Button onClick={handleCloseDialog} autoFocus>
              close
            </Button> 
          </DialogActions>
        </Dialog>
      }
    </div>
  );
};

export default Marker;