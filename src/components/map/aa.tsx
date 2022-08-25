const AnMarker: React.FC=()=> {
    return(
    <></>
    )
}
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
// import useOnclickOutside from "react-cool-onclickoutside";

// import React, { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';
// import { Marker as MarkerUtil } from '../../utils/marker';
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/icons-material/Menu";
// import Search from "@mui/icons-material/Search";
// import Directions from "@mui/icons-material/Directions";
// import { Button } from "@mui/material";
// import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
// import "@reach/combobox/styles.css";

// function sleep(delay = 0) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     });
// }
// const AddMarker: React.FC=()=> {
//     const {
//         ready,
//         value,
//         suggestions: { status, data },
//         setValue,
//         clearSuggestions,
//     } = usePlacesAutocomplete({
//         requestOptions: {
//             /* Define search scope here */
//         },
//         debounce: 300,
//     });
//     const ref = useOnclickOutside(() => {
//         clearSuggestions();
//     });

//     const handleInput = (e: any) => {
//         setValue(e.target.value);
//     };

//     const handleSelect =
//         (description: string) =>
//             () => {
//                 { console.log("description") }
//                 setValue(description, false);
//                 { console.log("value") }
//                 { console.log(value) }
//                 clearSuggestions();
//                 getThisPlaceInNumbers()
//             };

//     const getThisPlaceInNumbers = () => {
//         getGeocode({ address: value })
//             .then((results) => getLatLng(results[0]))
//             .then(({ lat, lng }) => {
//                 console.log(" Coordinates: ", { lat, lng });
//             })
//             .catch((error) => {
//                 console.log(" Error: ", error);
//             });
//     }

//     const renderSuggestions = () => {
//         data.map(() => {
//             const {
//                 place_id,
//                 structured_formatting: { main_text, secondary_text },
//             } = suggestion;

//             // const suggestion = data.map(({ place_id, description }: any) => (
//             //     <ComboboxOption key={place_id} value={description} />
//             // ));
//             return (
//                 <li key={place_id} onClick={handleSelect(suggestion)}>
//                     <strong>{main_text}</strong> <small>{secondary_text}</small>
//                 </li>
//             );
//             // return (
//             //     <>
//             //         {suggestion}
//             //     </>
//             // )
//         });
//     };
//     const [open, setOpen] = React.useState(false);
//     const [options, setOptions] = React.useState<readonly MarkerUtil[]>([]);
//     const loading = open && options.length === 0;
//     useEffect(() => {
//         let active = true;
//         if (!loading) {
//             return undefined;
//         }
//         (async () => {
//             await sleep(1e3);

//             if (active) {
//                 console.log("markers");
//             }
//         })();
//         return () => {
//             active = false;
//         };
//     }, [loading]);
//     useEffect(() => {
//         if (!open) {
//             setOptions([]);
//         }
//     }, [open]);

//     return (
//         <>
//             <Paper
//                 component="form"
//                 sx={{
//                     p: "2px 4px",
//                     display: "flex",
//                     alignItems: "center",
//                     width: 500,
//                 }}
//             >
//                 <InputBase
//                     sx={{ ml: 1, flex: 1 }}
//                     placeholder="Choose the place..."
//                     inputProps={{ 'aria-label': 'search google maps' }}
//                     value={value}
//                     onChange={handleInput}
//                     disabled={!ready}
//                 />
//                 <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
//                     <Search />
//                 </IconButton>
//             </Paper>
//             {status === "OK" && <ul>{renderSuggestions()}</ul>}
//         </>
//         // <div className='container'>
//         //     <h1 className='title'>search</h1>
//         //     <Combobox onSelect={handleSelect} aria-lableledby='demo'>
//         //         <ComboboxInput
//         //             style={{ width: 300, maxWidth: "90%" }}
//         //             value={value}
//         //             onChange={handleInput}
//         //             disabled={!ready}
//         //         />
//         //         <ComboboxPopover>
//         //             <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
//         //         </ComboboxPopover>
//         //     </Combobox>
//         // </div>
//     );
// }

// export default AddMarker