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
import { async } from '@firebase/util';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CardOfSelected from './cardOfSelected';
const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};


const CardOfShortDistances: React.FC = () => {
    const [addresses, setAddresses] = useState<string[]>([]);

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



    const find_closest_marker = async (lat: number, lng: number) => {
        debugger;
        let arr = [-1, -1, -1];
        if (markerStore.markers.length !== 0) {
            for (let j = 0; j < arr.length; j++) {
                let distance = Number.MAX_VALUE;
                for (let i = 0; i < markerStore.markers.length; i++) {
                    const d = getDistanceBetweenPoints(
                        markerStore.markers[i].location.lat,
                        markerStore.markers[i].location.lng,
                        lat,
                        lng
                    );
                    if (arr[j] == -1 || d < distance) {
                        distance = d;
                        if (j > 0) {
                            if (j == 1) {
                                if (i !== arr[j - 1])
                                    arr[j] = i;
                            }
                            if (j == 2) {
                                if (i !== arr[j - 1] && i !== arr[j - 2])
                                    arr[j] = i;
                            }
                        } else
                            arr[j] = i;
                    }

                }
            }
        }
        else {
            alert("there is no markers");
        }

        let addressesName: any[] = [];
        for (let i = 0; i < arr.length; i++) {
            const x = await getLocationNameByLatLng(arr[i]);
            console.log(x);
            addressesName[i] = x;
        }
        setAddresses(addressesName);
        mapStore.address=addressesName
    }

    useEffect(() => {
        find_closest_marker(mapStore.yourLocation.center.lat, mapStore.yourLocation.center.lng);
    }, []);

    const getLocationNameByLatLng = async (index: number) => {
        debugger
        let addresss = "";

        Geocode.setApiKey(process.env.MAP_APY_KEY|| '');
        Geocode.enableDebug();
        console.log(markerStore.markers[index].location.lat.toString())
        console.log(markerStore.markers[index].location.lng.toString())
        await Geocode.fromLatLng(markerStore.markers[index].location.lat.toString(), markerStore.markers[index].location.lng.toString()).then(
            (response: any) => {
                addresss = response.results[0].formatted_address;
            },
            (error: any) => {
                console.error(error);
            }
        );
        return addresss;
    }
    const [cardSelected,setCardSelected]=useState(false)
    const drow= async(i:number)=>{
        markerStore.currentMarker=null
        setCardSelected(false)
        debugger      
        markerStore.origin.lat=mapStore.yourLocation.center.lat;
        markerStore.origin.lng=mapStore.yourLocation.center.lng;
      await  getGeocode({ address: mapStore.address[i] })
                    .then((results) => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                        markerStore.destination.lat=lat;
                        markerStore.destination.lng=lng;
                    })
       await mapStore.apiIsLoaded()
        debugger
        await markerStore.selecteCard()

        setCardSelected(true)
    }
    return (
        <div>
            {addresses && addresses.map((address: string,index:number) =>(
                 <CardContent  onClick={()=>(drow(index))}>
                     <List sx={style} component="nav" aria-label="mailbox folders">
                         <ListItem button>
                             <ListItemText primary={address} />
                             <DirectionsWalkIcon/>
                         </ListItem>
                         <Divider />
                     </List>
                 </CardContent>
            ))}
            {cardSelected&&markerStore.currentMarker&& <CardOfSelected/>}
        </div>
    )
}
export default observer(CardOfShortDistances)