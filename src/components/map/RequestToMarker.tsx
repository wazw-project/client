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
import requestStore from '../../store/request';
import { RequestToMarker } from '../../utils/request';

const Request = () => {
    const [open, setOpen] = React.useState(false);
    const inputFirstName = useRef<HTMLInputElement>();
    const inputLastName = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputDisplay_name = useRef<HTMLInputElement>();


    //  "location":{"lat": 31.0461,
    //          "lng": 35.8516}


    const inputNotes = useRef<HTMLInputElement>();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const sendRequest = async () => {
        const newRequest: any = {

         

            "firstName": inputFirstName.current?.value,
            "lastName": inputLastName.current?.value,
            "phone": inputPhone.current?.value,
            "email": inputEmail.current?.value,
            "system_id": systemStore.currentSystem.system_id,
            "display_name": inputDisplay_name.current?.value,
            "location": {
                "lat": markerStore.markerToAdd.location.lat,
                "lng": markerStore.markerToAdd.location.lng
            },
        

        }
        try {
            await requestStore.addRequest(newRequest)
            // await markerStore.UpdateMarker(markerStore.currentMarker._id, newMarker);
            // MapStore.setCardOfSolution(false)
            // MapStore.setZoom(8)
             swal("saved!", "your request send!", "success");
        }
        catch (error) {
            swal("error!", "error", "error");
        }

        handleClose()
        setOpen(false);
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Request
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    send request to open marker in this system, enter your details...
                </DialogTitle>

       
                <DialogContent>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField inputRef={inputFirstName} label="first-Name" variant="standard" />
                    </Grid>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField inputRef={inputLastName} label="last-Name" variant="standard" />
                    </Grid>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField inputRef={inputDisplay_name} label="display_name" variant="standard" />
                    </Grid>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField inputRef={inputPhone} label="phone" variant="standard" />
                    </Grid>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField inputRef={inputEmail} label="email" variant="standard" />
                    </Grid>
                    <Grid item sx={{ marginTop: "4%" }}>
                        <TextField

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
                    <Button onClick={sendRequest}>save</Button>
                    <Button onClick={handleClose} autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default observer(Request)
