import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Marker } from '../utils/marker';

class Store {

    markers: Marker[] = [];
    currentMarker: any = null;
    constructor() {
        makeAutoObservable(this);

        this.markers.push({
            lat: 11.0168,
            lng: 76.9558,
            name: "Tamar-o",
            color: "red"
        })
        this.markers.push({
            lat: 11.968,
            lng: 76.7558,
            name: "Tamar-k",
            color: "red"
        })
        this.markers.push({
            lat: 11.568,
            lng: 76.4558,
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
     this.currentMarker=this.markers.find((m)=>(m.name===name))     
    }

}
const markerStore = new Store();
export default markerStore;