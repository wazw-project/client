
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Marker as MarkerUtil } from '../utils/marker';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import Directions from "@mui/icons-material/Directions";
import { Button } from "@mui/material";


interface Film {
    title: string;
    year: number;
}
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
const AddMarker: React.FC = () => {
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
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e: any) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        (description: any) =>
            () => {
                // When user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description })
                    .then((results) => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                        console.log("📍 Coordinates: ", { lat, lng });
                    })
                    .catch((error) => {
                        console.log("😱 Error: ", error);
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

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly MarkerUtil[]>([]);
    const loading = open && options.length === 0;
    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            await sleep(1e3); // For demo purposes.

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

    return (
        <>
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 500,
            }}
        >

            {/* <div ref={ref}> */}
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={value}
                onChange={handleInput}
                disabled={!ready}
                
            />
          
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
          
            {/* </div> */}
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
            </IconButton>



        </Paper>
          {status === "OK" && <div>{renderSuggestions()}</div>}
          </>
    );
}

export default AddMarker;