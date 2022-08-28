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
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Geocode from "react-geocode";

const Request = () => {
    const [open, setOpen] = React.useState(false);
    const inputFirstName = useRef<HTMLInputElement>();
    const inputLastName = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputDisplay_name = useRef<HTMLInputElement>();

    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [status, setStatus] = useState<string>("");

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus("");
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }

    const getMapOptions = (maps: any) => {
        return {
            disableDefaultUI: true,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
    };

    const inputNotes = useRef<HTMLInputElement>();
    const handleClickOpen = () => {
        debugger
        setOpen(true);
        getLocation();
    };

    useEffect(() => {
        debugger
        getLocationNameByLatLng()
    },[lat,lng]);

    const handleClose = () => {
        setOpen(false);
    };
    const sendRequest = async () => {

        const newRequest: any = {
            "firstName": inputFirstName.current?.value,
            "lastName": inputLastName.current?.value,
            "phone": inputPhone.current?.value,
            "email": inputEmail.current?.value,
            "system_id": systemStore.currentSystem._id,
            "display_name": inputDisplay_name.current?.value,
            "location": {
                "lat": lat,
                "lng": lng
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

    const getLocationNameByLatLng = () => {
        Geocode.setApiKey("AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw");
        Geocode.enableDebug();
        Geocode.fromLatLng(lat.toString(),lng.toString()).then(
            (response: any) => {
                const address = response.results[0].formatted_address;
                requestStore.currentRequestAddressesName=address;
                console.log(address);
            },
            (error: any) => {
                console.error(error);
            }
        );
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
                    <Grid container spacing={2} height={592}>
                        <Grid item xs={6} md={8}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw' }}
                                center={{ lat: lat && lat, lng: lng && lng }}
                                zoom={18}
                                // onGoogleApiLoaded={() => getLocation()}
                                options={getMapOptions}
                            >
                                <Marker
                                    lat={lat && lat}
                                    lng={lng && lng}
                                    name={'aa'}
                                    color={'red'}
                                />
                            </GoogleMapReact>
                        </Grid>
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
