import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Map } from '../utils/map';

class Store {

    currentMap: Map =
        {
            zoom: 18,
            center: { lat: 31.0461, lng: 34.8516 }
        }
    currentCard: boolean = false;
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