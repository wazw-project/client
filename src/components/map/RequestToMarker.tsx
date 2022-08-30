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
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Geocode from "react-geocode";
import userStore from '../../store/userStore';
import Login from '../login/Login';

const Request = () => {
    const [open, setOpen] = React.useState(false);
    const inputFirstName = useRef<HTMLInputElement>();
    const inputLastName = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputDisplay_name = useRef<HTMLInputElement>();
    const [FirstNameV, setFirstNameV] = useState<string>("");
    const [LastNameV, setLastNameV] = useState<string>("");
    const [PhoneV, setPhoneV] = useState<string>("");
    const [EmailV, setEmailV] = useState<string>("");
    const [startFirstNameV, setstartFirstNameV] = useState<boolean>(false);
    const [startLastNameV, setstartLastNameV] = useState<boolean>(false);
    const [startPhoneV, setstartPhoneV] = useState<boolean>(false);
    const [startEmailV, setstartEmailV] = useState<boolean>(false);
    const [loginOpen, setLoginOpeb] = useState<boolean>(false);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [status, setStatus] = useState<string>("");
    const inputNotes = useRef<HTMLInputElement>();

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus("");
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                MapStore.currentMap.center.lat=position.coords.latitude
                MapStore.currentMap.center.lng=position.coords.longitude
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


    const handleClickOpen = () => {
        setOpen(true);
        getLocation();
    };

    useEffect(() => {
        getLocationNameByLatLng()
    }, [lat, lng]);

    const handleClose = () => {
        setOpen(false);
    };
    const sendRequest = async () => {
        if (FirstNameV === "" || LastNameV === "" || PhoneV === "" || EmailV === "" || !isValidEmail(EmailV)) {
            swal("your form is not validate!!", "You clicked the button!", "error");
        }
        else {
            const newRequest: any = {
                "firstName": inputFirstName.current?.value,
                "lastName": inputLastName.current?.value,
                "phone": inputPhone.current?.value,
                "email": inputEmail.current?.value,
                "system_id": systemStore.currentSystem._id,
                "user_id": userStore.user._id,
                "display_name": inputDisplay_name.current?.value,
                "notes": inputNotes.current?.value,
                "location": {
                    "lat": markerStore.markerToAdd.location.lat,
                    "lng":  markerStore.markerToAdd.location.lng
                },
            }
            try {
                await requestStore.addRequest(newRequest)
                requestStore.currentRequest = newRequest

                swal("saved!", "your request send!", "success");
            }
            catch (error) {
                swal("error!", "error", "error");
            }
            handleClose();
            setOpen(false);
            requestStore.currentRequestAddressesName="";
        }
    }

    const login = () => {
        setLoginOpeb(true)
        userStore.loginFrom = `/Map/hello/${systemStore.currentSystem.urlName}`
    }
    const getLocationNameByLatLng = () => {
        debugger
        Geocode.setApiKey("AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw");
        Geocode.enableDebug();
        Geocode.fromLatLng(MapStore.currentMap.center.lat.toString(), MapStore.currentMap.center.lng.toString()).then(
            (response: any) => {
                const address = response.results[0].formatted_address;
                requestStore.currentRequestAddressesName = address;
                console.log(address);
            },
            (error: any) => {
                console.error(error);
            }
        );
    }
    function isValidPhone(phone: string) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);
    }
    function isValidEmail(email: string) {
        return /^[-!#$%&\'*+\\.\/0-9=?A-Z^_`{|}~]+@([-0-9A-Z]+\.)+([0-9A-Z]){2,4}$/i.test(email);
    }

    return (
        <div>
            <Button variant="contained" sx={{marginLeft:"5%",marginTop:'5%'}} onClick={handleClickOpen}>
                Request
            </Button>
            {userStore.user ?
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
                            <TextField inputRef={inputFirstName}
                                label="first-Name"
                                variant="standard"
                                onChange={(e) => (setFirstNameV(e.target.value), setstartFirstNameV(true))}
                                onBlur={(e) => (setFirstNameV(e.target.value), setstartFirstNameV(true))}
                                helperText={FirstNameV === "" ? "required!" : " "}
                                error={FirstNameV === "" && startFirstNameV}
                            />
                        </Grid>
                        <Grid item sx={{ marginTop: "4%" }}>
                            <TextField inputRef={inputLastName}
                                label="last-Name"
                                variant="standard"
                                onChange={(e) => (setLastNameV(e.target.value), setstartLastNameV(true))}
                                onBlur={(e) => (setLastNameV(e.target.value), setstartLastNameV(true))}
                                helperText={LastNameV === "" ? "required!" : " "}
                                error={LastNameV === "" && startLastNameV}
                            />
                        </Grid>
                        <Grid item sx={{ marginTop: "4%" }}>
                            <TextField inputRef={inputDisplay_name} label="display_name" variant="standard" />
                        </Grid>
                        <Grid item sx={{ marginTop: "4%" }}>
                            <TextField inputRef={inputPhone}
                                label="phone"
                                variant="standard"
                                onChange={(e) => (setPhoneV(e.target.value), setstartPhoneV(true))}
                                onBlur={(e) => (setPhoneV(e.target.value), setstartPhoneV(true))}
                                helperText={PhoneV === "" ? "required!" : isValidPhone(PhoneV) ? "" : "not valid phone"}
                                error={(PhoneV === "" || !isValidPhone(PhoneV)) && startPhoneV}
                            />
                        </Grid>
                        <Grid item sx={{ marginTop: "4%" }}>
                            <TextField inputRef={inputEmail}
                                label="email"
                                variant="standard"
                                onChange={(e) => (setEmailV(e.target.value), setstartEmailV(true))}
                                onBlur={(e) => (setEmailV(e.target.value), setstartEmailV(true))}
                                helperText={EmailV === "" ? "required!" : isValidEmail(EmailV) ? "" : "not valid email"}
                                error={(EmailV === "" || !isValidEmail(EmailV)) && startEmailV}
                            />
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
                        {requestStore.currentRequestAddressesName&&
                            <AutoComplete />}
                        </Grid>
                        <Grid container spacing={2} height={592}>
                            <Grid item xs={6} md={8}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw' }}
                                    center={{ lat: MapStore.currentMap.center.lat && MapStore.currentMap.center.lat, lng: MapStore.currentMap.center.lng && MapStore.yourLocation.center.lng }}
                                    zoom={18}
                                    // onGoogleApiLoaded={() => getLocation()}
                                    options={getMapOptions}
                                >
                                    <Marker
                                        lat={MapStore.currentMap.center.lat}
                                        lng={MapStore.currentMap.center.lng}
                                        name={'your location'}
                                        color={'yellow'}
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
                </Dialog> : <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {!loginOpen &&
                        <>
                            <DialogTitle id="alert-dialog-title">
                                for send request you need login!
                            </DialogTitle>
                            <Button variant="outlined" onClick={login}>
                                login
                            </Button></>}
                    {loginOpen &&
                        <DialogActions>
                            <Login />
                        </DialogActions>}
                </Dialog>
            }
        </div>
    );
}
export default observer(Request)
