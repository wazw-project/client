import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Marker } from '../utils/marker';

class Store {

    markers: Marker[] = [];
    currentMarker: any = null;
    markerToAdd:Marker={
        manager_id: '',
        system_id: "",
        location: {
            lat: 0,
            lng: 0,
            name: "",
            color: "red"
        },
        description: "",
        name: "",
        notes: "",
    };
    constructor() {
        makeAutoObservable(this);

        this.markers.push({
            manager_id: 'dfsdv',
            system_id: "fsdv",
            location: {
                lat: 31.0461,
                lng: 34.8516,
                name: "Tamar-o",
                color: "red"
            },
            description: "gjmhb",
            name: "Tamar-o",
            notes: "njnkjn",
        })
        this.markers.push({
            manager_id: 'dfsdv',
            system_id: "fsdv",
            location: {
                lat: 31.0461,
                lng: 35.8516,
                name: "Tamar-k",
                color: "red"
            },
            description: "gjmhb",
            name: "Tamar-k",
            notes: "njnkjn",
        })
        this.markers.push({
            manager_id: 'dfsdv',
            system_id: "fsdv",
            location: {
                lat: 31.0461,
                lng: 36.8516,
                name: "Naama",
                color: "red"
            },
            description: "gjmhb",
            name: "Naama",
            notes: "njnkjn",
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

    addMarker(marker: Marker){
        this.markers.push(marker);
        //request function
    }

}
const markerStore = new Store();
export default markerStore;