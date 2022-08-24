import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Marker } from '../utils/marker';

class Store {

    markers: Marker[] = [];
    currentMarker: any = null;
    constructor() {
        makeAutoObservable(this);

        this.markers.push({
            lat: 31.0461,
            lng: 34.8516,
            name: "Tamar-o",
            color: "red"
        })
        this.markers.push({
            lat: 31.0461,
            lng: 35.8516,
            name: "Tamar-k",
            color: "red"
        })
        this.markers.push({
            lat: 31.0461,
            lng: 36.8516,
            name: "Naama",
            color: "red"
        })

    }
    async removeMarkers(name: string) {
        debugger
        console.log(this.markers)
        this.markers = this.markers.filter((markers) => (markers.name !== name))
        console.log(this.markers)
    }
    async SetcurrentMarker(name: string) {
        this.currentMarker = this.markers.find((m) => (m.name === name))
    }
    async SearchMarker(name: string | undefined) {
        debugger
        if (name !== "") {
            this.currentMarker = this.markers.find((m) => (m.name === name))
            console.log(this.currentMarker.name)
        }

    }

}
const markerStore = new Store();
export default markerStore;