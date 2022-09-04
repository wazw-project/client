import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import MapStore from '../../store/mapStore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import markerStore from '../../store/markerStore';
import mapStore from '../../store/mapStore';
import swal from 'sweetalert';
import Geocode from "react-geocode";

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};


const CardOfShortDistances: React.FC = () => {
    const [address, setAddress] = useState("");

    function degreesToRadians(degrees: number) {
        return (degrees * Math.PI) / 180;
    }
    
    function getDistanceBetweenPoints(
        lat1: number,
        lng1: number,
        lat2: number,
        lng2: number
    ) {
        let R = 6378137;
        let dLat = degreesToRadians(lat2 - lat1);
        let dLong = degreesToRadians(lng2 - lng1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degreesToRadians(lat1)) *
            Math.cos(degreesToRadians(lat1)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);
    
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let distance = R * c;
    
        return distance;
    }
    
    // const find_closest_marker=(lat: number, lng: number)=> {
    //     debugger;
    //     let distances = [];
    //     let closest = -1;
    //     for (let i = 0; i < markerStore.markers.length; i++) {
    //         const d = getDistanceBetweenPoints(
    //             markerStore.markers[i].location.lat,
    //             markerStore.markers[i].location.lng,
    //             lat,
    //             lng
    //         );
    //         distances[i] = d;
    //         if (closest == -1 || d < distances[closest]) {
    //             closest = i;
    //         }
    //     }
    //     mapStore.yourLocation.center = {
    //         lat: markerStore.markers[closest].location.lat,
    //         lng: markerStore.markers[closest].location.lng,
    //     };
    //     mapStore.yourLocation.zoom = 18;
    //     // mapStore.openInfo = true;
    //     markerStore.currentMarker = markerStore.markers[closest];
    //     swal("Closest location is " + markerStore.markers[closest].location.lat);
    //     MapStore.resultWays = false;
    // }

    const find_closest_marker=(lat: number, lng: number)=> {
        debugger;
        let distances = [];
        let min1= Number.MAX_VALUE;
        let min2= Number.MAX_VALUE;
        let min3= Number.MAX_VALUE;
        let closest = -1;
        for (let i = 0; i < markerStore.markers.length; i++) {
            const d = getDistanceBetweenPoints(
                markerStore.markers[i].location.lat,
                markerStore.markers[i].location.lng,
                lat,
                lng
            );
            distances[i] = d;
            if (closest === -1 || d < distances[closest] ) {
                min1=d;
                closest = i;
            }
        }
       
        // mapStore.yourLocation.center = {
        //     lat: markerStore.markers[closest].location.lat,
        //     lng: markerStore.markers[closest].location.lng,
        // };
        mapStore.yourLocation.zoom = 18;
        markerStore.currentMarker = markerStore.markers[closest];
        swal("Closest location is " + markerStore.markers[closest].location.lat);
        markerStore.destination.lat=markerStore.currentMarker.location.lat
        markerStore.destination.lng=markerStore.currentMarker.location.lng    
        markerStore.origin.lat=mapStore.yourLocation.center.lat
        markerStore.origin.lng=mapStore.yourLocation.center.lng
        debugger;
        console.log( markerStore.destination.lat,markerStore.destination.lng)  
        console.log(markerStore.origin.lat,markerStore.origin.lng)
    }
    
    useEffect(() => {
        find_closest_marker(mapStore.yourLocation.center.lat, mapStore.yourLocation.center.lng);
    }, []);
    
    useEffect(() => {
        getLocationNameByLatLng()
    },[markerStore.currentMarker])
    
    const getLocationNameByLatLng = () => {
        debugger
        Geocode.setApiKey("AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw");
        Geocode.enableDebug();
        Geocode.fromLatLng(markerStore.currentMarker.location.lat.toString(), markerStore.currentMarker.location.lng.toString()).then(
            (response: any) => {
                const addresss = response.results[0].formatted_address;
                setAddress(addresss);
                // requestStore.currentRequestAddressesName = address;
                console.log(addresss);
            },
            (error: any) => {
                console.error(error);
            }
        );
        debugger;
       
    }
    return (
        <>{address && 
            <Card sx={{ maxWidth: 450, marginTop: "5%" }} onClick={()=>mapStore.apiIsLoaded()}>
                <CardContent>
                    <List sx={style} component="nav" aria-label="mailbox folders">
                         <ListItem button>
                            <ListItemText primary={address} />
                        </ListItem>
                        {/*
                        {/* <ListItem button>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemText primary="Spam" />
                        </ListItem> */}
                    </List>
                </CardContent>
            </Card>
        }
        </>
    )
}
export default observer(CardOfShortDistances)