import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Map } from '../utils/map';

class Store {

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
}
const MapStore = new Store();
export default MapStore;