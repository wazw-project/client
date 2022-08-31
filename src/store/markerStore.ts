import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Marker } from '../utils/marker';
import { get } from 'react-hook-form';
import systemStore from './systemStore';
const addMarker = async (marker: Marker) => {
    try {
        const res = await axios.post(`http://localhost:3333/marker/addMarker`, marker);
        let tempList = await res.data;
        return tempList;
    } catch (error) { console.log(error); }
}
const UpdateMarker = async (id: string, marker: Marker) => {
    try {
        const res = await axios.put(`http://localhost:3333/marker/${id}`, marker);
        let tempList = await res.data;
        return tempList;
    } catch (error) { console.log(error); }
}
const getAllMarkerForSystem = async (system_id: string) => {
    try {
        debugger
        const res = await axios.get(`http://localhost:3333/marker/getBySystemId/${system_id}`);
        debugger
        let tempList = await res.data;
        debugger;
        console.log(tempList)
        return tempList;
    }
    catch (error) { console.log(error); }
}
const deleteMarker = async (marker_id: string | undefined) => {
    try {
        const res = await axios.delete(`http://localhost:3333/marker/${marker_id}`);
        let tempList = await res.data;
        return tempList;
    }
    catch (error) { console.log(error); }
}

const getMarkersBySystemId=async(systemId: string)=>{
    try {
        const res = await axios.delete(`http://localhost:3333/marker/getBySystemId/${systemId}`);
        let tempList = await res.data;
        return tempList;
    }
    catch (error) { console.log(error); }
}
class Store {

    markers: Marker[] = [];
    currentMarker: any = null;
    markerToAdd: Marker = {
        manager_id: '',
        system_id: "",
        location: {
            lat: 0,
            lng: 0
        },

        description: "",
        name: "",
        notes: "",
        email: "string",
        phone: ""
    };
    constructor() {
        makeAutoObservable(this);

       
    }
    async getAllMarkerForSystem(id: string) {
        debugger
        this.markers = await getAllMarkerForSystem(id)
        console.log(this.markers)
    }
    async removeMarkers(id: string) {
        console.log(this.markers)
        await deleteMarker(id)
        this.markers = this.markers.filter((m) => (m._id !== id))
        console.log(this.markers)
    }
    async SetcurrentMarker(name: string) {
        this.currentMarker = this.markers.find((m) => (m.name === name))
    }
    async SearchMarker(name: string | undefined) {
        if (name !== "") {
            this.currentMarker = this.markers.find((m) => (m.name === name))
            console.log(this.currentMarker.name)
        }
    }

    async addMarker(marker: Marker) {
        const markerAdded = await addMarker(marker)
        this.markers.push(markerAdded);
        this.currentMarker = markerAdded;
        // this.currentMarker=null
        //request function
    }
    async UpdateMarker(id: string, marker: any) {
        await UpdateMarker(id, marker)

        this.markers = await getAllMarkerForSystem(systemStore.currentSystem._id)
        this.currentMarker = null
        //request function
    }

    async getMarkersBySystemId(systemId: string) {
        this.markers = await getMarkersBySystemId(systemId)
    }

}
const markerStore = new Store();
export default markerStore;