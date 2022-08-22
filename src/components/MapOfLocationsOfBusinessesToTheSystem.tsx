import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

const MapOfLocationsOfBusinessesToTheSystem: React.FC = (props: any) => {
    return (
        <Map
            google={props.google}
            //zoom:ZoomProps={14}
            style={mapStyles}
            initialCenter={
                {
                    lat: -1.2884,
                    lng: 36.8233
                }
            }
        />
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw'
})(MapOfLocationsOfBusinessesToTheSystem);