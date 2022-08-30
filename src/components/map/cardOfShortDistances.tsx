import React, { useEffect } from 'react';
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

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};

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

const find_closest_marker=(lat: number, lng: number)=> {
    debugger;
    let distances = [];
    let closest = -1;
    for (let i = 0; i < markerStore.markers.length; i++) {
        const d = getDistanceBetweenPoints(
            markerStore.markers[i].location.lat,
            markerStore.markers[i].location.lng,
            lat,
            lng
        );
        distances[i] = d;
        if (closest == -1 || d < distances[closest]) {
            closest = i;
        }
    }
    mapStore.yourLocation.center = {
        lat: markerStore.markers[closest].location.lat,
        lng: markerStore.markers[closest].location.lng,
    };
    mapStore.yourLocation.zoom = 18;
    // mapStore.openInfo = true;
    markerStore.currentMarker = markerStore.markers[closest];
    // navigate(`/system/welcome/${name}/${uid}`);
    swal("Closest location is " + markerStore.markers[closest].location.lat);
}



const CardOfShortDistances: React.FC = () => {

    useEffect(() => {
        find_closest_marker(mapStore.yourLocation.center.lat, mapStore.yourLocation.center.lng);
    }, []);

    return (
        <> {MapStore.currentCard && 
            <Card sx={{ maxWidth: 450, marginTop: "5%" }}>
                <CardContent>
                    <List sx={style} component="nav" aria-label="mailbox folders">
                         <ListItem button>
                            <ListItemText primary={mapStore.yourLocation.center.lat} />
                            <ListItemText primary={mapStore.yourLocation.center.lng} />
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
export default CardOfShortDistances