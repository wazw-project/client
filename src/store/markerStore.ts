import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Marker } from '../utils/marker';

class Store {

    marker: Marker[] = [];
    constructor() {
        makeAutoObservable(this);

        this.marker.push({
            lat: 11.0168,
            lng: 76.9558,
            name: "Tamar-o",
            color: "red"
        })
        this.marker.push({
            lat: 11.968,
            lng: 76.7558,
            name: "Tamar-k",
            color: "red"
        })
        this.marker.push({
            lat: 11.568,
            lng: 76.4558,
            name: "Naama",
            color: "red"
        })

    }


}
const markerStore = new Store();
export default markerStore;