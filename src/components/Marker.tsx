import React, { useState } from 'react';
import './Marker.css';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const Marker = (props: any) => {
  const nameOfLocation=(e:any)=>{
    setMarkerName(e.target.title)
    handleClick(e)
  }
  const detailsOfLocation=(e:any)=>{  
    alert(e.target.title)
 }
    const { color, name, id } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
     const[markersName,setMarkerName]=useState<string>("")
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
          onMouseMove={nameOfLocation}
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
      </div>
    );
  };

  export default Marker;