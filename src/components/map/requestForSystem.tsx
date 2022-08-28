import React, { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import requestStore from '../../store/request';
import systemStore from '../../store/systemStore';

const RequestForSystem=()=>{
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
      setOpen(!open);
    };
    const openRequest=async(id:string|undefined)=>{
        if(id==null){
            id=""
        }
await requestStore.getRequestById(id)
console.log(requestStore.currentRequest.firstName)
    }
    async function getAllRequest() {
        debugger
        try {
            await requestStore.getRequestForSystem(systemStore.currentSystem._id);
        } catch (error) { console.log(error); }
    }

    useEffect(() => {
        debugger
        getAllRequest();
    }, [])
 return(<>
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
            {requestStore.request&&
           requestStore.request.map((r)=>(
          <ListItemButton key={r._id}   sx={{ pl: 4 }}>
            <ListItemIcon  >
             <AddLocationIcon/>
            </ListItemIcon >
            <ListItemText  primary={r.firstName+" "+r.lastName} onClick={()=>{openRequest(r._id)}} />
          </ListItemButton>))}
        </List>
      </Collapse>
    </List></>)
}
export default RequestForSystem

function key(key: any): React.MouseEventHandler<HTMLAnchorElement> | undefined {
    throw new Error('Function not implemented.');
}
