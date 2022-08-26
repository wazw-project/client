import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Marker } from '../utils/marker';
import { get } from 'react-hook-form';

// const addMarker = async (marker: Marker) => {
//     try {
//         const res = await axios.post(`http://localhost:3333/marker/addUser`, marker);
//         let tempList = await res.data;
//         return tempList;
//     } catch (error) { console.log(error); }
// }
const getAllMarkerForSystem = async (system_id: string) => {
    try {
        debugger
        const res = await axios.get(`http://localhost:3333/marker/getBySystemId/${system_id}`);
        let tempList = await res.data;
        return tempList;
    }
    catch(error) { console.log(error); }
}


class Store {

    markers: Marker[] = [];
    currentMarker: any = null;
    markerToAdd: Marker = {
        manager_id: '',
        system_id: "",
        location:{lat: 0,
            lng: 0},
        
        description: "",
        name: "",
        notes: "",
        email: "string",
        phone: "5476876"
    };
    constructor() {
        makeAutoObservable(this);

        // this.markers.push({
        //     manager_id: 'dfsdv',
        //     system_id: "fsdv",
        //     lat: 31.0461,
        //     lng: 34.8516,
        //     description: "gjmhb",
        //     name: "Tamar-o",
        //     notes: "njnkjn",
        //     email: "string",
        //     phone: "5476876"
        // })
        // this.markers.push({
        //     manager_id: 'dfsdv',
        //     system_id: "fsdv",
        //     lat: 31.0461,
        //     lng: 35.8516,
        //     description: "gjmhb",
        //     name: "Tamar-k",
        //     notes: "njnkjn",
        //     email: "string",
        //     phone: "5476876"
        // })
        // this.markers.push({
        //     manager_id: 'dfsdv',
        //     system_id: "fsdv",

        //     lat: 31.0461,
        //     lng: 36.8516,

        //     description: "gjmhb",
        //     name: "Naama",
        //     notes: "njnkjn",
        //     email: "string",
        //     phone: "5476876"
        // })
    }
   async getAllMarkerForSystem(id:string) {
       debugger;
      this.markers= await getAllMarkerForSystem(id)
      console.log(this.markers)
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

    addMarker(marker: Marker) {
        this.markers.push(marker);
        //request function
    }

}
const markerStore = new Store();
export default markerStore;