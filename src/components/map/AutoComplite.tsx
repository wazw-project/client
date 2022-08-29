
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Marker as MarkerUtil } from '../../utils/marker';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import Directions from "@mui/icons-material/Directions";
import { Button } from "@mui/material";
import markerStore from '../../store/markerStore';
import { observer } from 'mobx-react';
import requestStore from "../../store/request";
import MapStore from "../../store/mapStore";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
const AutoComplete: React.FC = () => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e: any) => {
        setValue(e.target.value);
    };

    const handleSelect =
        (description: any) =>
            () => {
                if(!description.structured_formatting.secondary_text){
                    description.structured_formatting.secondary_text=""
                }
                setValue((description.structured_formatting.main_text+" "+ description.structured_formatting.secondary_text)  , false);
                clearSuggestions();
                getGeocode({ address: description.description })
                    .then((results) => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                        console.log("Coordinates: ", { lat, lng });
                        markerStore.markerToAdd.location.lat = lat;
                        markerStore.markerToAdd.location.lng = lng;
                        MapStore.yourLocation.center.lat=lat
                        MapStore.yourLocation.center.lng=lng
                        requestStore.currentRequestAddressesName=description.description;
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                    });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <div key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </div>
            );
        });
    const [f ,setF]=useState<string>("")
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly MarkerUtil[]>([]);
    const loading = open && options.length === 0;
    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            await sleep(1e3); 

            if (active) {
                // setOptions([...markers]);
                console.log("markers");
            }
        })();
        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        if (requestStore.currentRequestAddressesName) {
            setValue(requestStore.currentRequestAddressesName);
        }
    }, []);

    return (
        <>
            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 300,
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    defaultValue={requestStore.currentRequestAddressesName}

                />
                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                    <Search />
                </IconButton>
            </Paper>
            {status === "OK" && <div>{renderSuggestions()}</div>}
        </>
    );
}

export default observer(AutoComplete);