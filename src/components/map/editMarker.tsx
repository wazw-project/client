import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react';
import AutoComplete from './AutoComplite';
import swal from 'sweetalert';
import systemStore from '../../store/systemStore';
import MapStore from '../../store/mapStore';
import markerStore from '../../store/markerStore';


const EditMarker = () => {
    const [open, setOpen] = React.useState(false);
    const inputName = useRef<HTMLInputElement>();
    const inputDescription = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputNotes = useRef<HTMLInputElement>();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const saveDetails=async()=>{
        debugger;
        const newMarker: any = {
        
            "location": {
              "lat": markerStore.markerToAdd.location.lat,
              "lng": markerStore.markerToAdd.location.lng
            },
            
            "description": inputDescription.current?.value,
            "name": inputName.current?.value,
            "notes": inputNotes.current?.value,
            "phone": inputPhone.current?.value,
            "email": inputEmail.current?.value
        }
       try{
       await markerStore.UpdateMarker(markerStore.currentMarker._id, newMarker);
       MapStore.setCardOfSolution(false)
       MapStore.setZoom(8)
        swal("saved!", "your location added!", "success");
       } 
       catch(error){
        swal("error!", "error", "error");
       }
       
        handleClose()
        setOpen(false);
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    edit your markers details
                </DialogTitle>
                <DialogContent>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField inputRef={inputName} label="name" variant="standard" defaultValue={markerStore.currentMarker.name} />
                    </Grid>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField inputRef={inputDescription} label="description" variant="standard" defaultValue={markerStore.currentMarker.description}/>
                    </Grid>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField inputRef={inputPhone} label="phone" variant="standard" defaultValue={markerStore.currentMarker.phone}/>
                    </Grid>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField inputRef={inputEmail} label="email" variant="standard" defaultValue={markerStore.currentMarker.email} />
                    </Grid>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField
                        value={markerStore.currentMarker.notes}
                            inputRef={inputNotes}
                            id="standard-textarea"
                            label="notes"
                            placeholder="notes"
                            minRows={3}
                            multiline
                            variant="standard"
                        />
                    </Grid>
  
                    <Grid item sx={{ marginTop: "4%" }}>
                        <AutoComplete />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={saveDetails}>save</Button>
                    <Button onClick={handleClose} autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default observer(EditMarker)
