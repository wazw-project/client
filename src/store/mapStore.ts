import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Map } from '../utils/map';
import markerStore from './markerStore';


const apiIsLoaded = (map:any) => {
    debugger
    if (map) {
      debugger;
      console.log(map)
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: markerStore.origin,
          destination: markerStore.destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    };

  }
class Store {
       map:any=null;
    currentMap: Map =
        {
            zoom: 18,
            center: { lat: 0, lng: 0 }
        }
        yourLocation:Map={
            zoom: 18,
            center: { lat: 0, lng: 0}
        }
    currentCard: boolean = false;
    resultWays:boolean = false;
    
    constructor() {
        makeAutoObservable(this);
    }
    async setCenter(lat: number, lng: number) {
        this.currentMap.center.lat = lat
        this.currentMap.center.lng = lng
    }
    async setZoom(zoom: number) {
        this.currentMap.zoom = zoom
    }
    async setCardOfSolution(b: boolean) {
        this.currentCard = b
    }
    async apiIsLoaded() {
        await apiIsLoaded(this.map)
    }

}
const MapStore = new Store();
export default MapStore;