import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
const mapStyles = {
  width: '60%',
  height: '90%'
};
interface Film {
  title: string;
  year: number;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const MapOfLocationsOfBusinessesToTheSystem: React.FC = (props: any) => {
  const [state, setState] = React.useState<any>({
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  })

  const onMarkerClick = (props: any, marker: any, e: any) =>
    setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  const onClose = (props: any) => {
    if (state.showingInfoWindow) {
      setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Film[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const center={lat:32,lng:-35};
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Map
              google={props.google}
              zoom={14}
              style={mapStyles}
              initialCenter={
                {
                  lat: -1.2884,
                  lng: 36.8233
                }
              }
            />
            
           

          </Grid>
          <Grid item xs={6} md={4}>
            <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h4" component="div">
              here you can search  location business of your system
            </Typography>

            <Autocomplete
              id="asynchronous-demo"
              sx={{ width: 300 }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) => option.title === value.title}
              getOptionLabel={(option) => option.title}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Asynchronous"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />

          </Grid>
        </Grid>
      </Box>
    </>
  );
}
const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw'
})(MapOfLocationsOfBusinessesToTheSystem);


// import { useState, useEffect, useRef } from 'react';
// import { Wrapper, Status } from "@googlemaps/react-wrapper";

// interface MapProps extends google.maps.MapOptions {
//   style: { [key: string]: string };
//   onClick?: (e: google.maps.MapMouseEvent) => void;
//   onIdle?: (map: google.maps.Map) => void;
//   children?: any
// }
// const render = (status: Status) => {
//   return <h1>{status}</h1>;
// };
// <Wrapper apiKey={"AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw"} render={render}>
//   {/* <MapOfLocationsOfBusinessesToTheSystem/> */}
// </Wrapper>

// const MapOfLocationsOfBusinessesToTheSystem: React.FC<MapProps> = ({ onClick, onIdle, children, style, ...options }) => {

//   const ref = useRef<HTMLDivElement>(null);
//   const [map, setMap] = useState<google.maps.Map>();
//   useEffect(() => {
//     if (map) {
//       map.setOptions(options);
//     }
//   }, [map, options]);

//   useEffect(() => {
//     if (map) {
//       ["click", "idle"].forEach((eventName) =>
//         google.maps.event.clearListeners(map, eventName)
//       );

//       if (onClick) {
//         map.addListener("click", onClick);
//       }

//       if (onIdle) {
//         map.addListener("idle", () => onIdle(map));
//       }
//     }
//   }, [map, onClick, onIdle]);





//   useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}));
//     }
//   }, [ref, map]);
//   return (<>
//     <div ref={ref} style={style} />
//     {React.Children.map(children, (child) => {
//       if (React.isValidElement(child)) {
//         // set the map prop on the child component
//         return React.cloneElement(child, { map });
//       }
//     })}
//   </>);
// };
// export default MapOfLocationsOfBusinessesToTheSystem