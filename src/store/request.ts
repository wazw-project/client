
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import {RequestToMarker} from '../utils/request'


const addRequest = async (request:RequestToMarker) => {
    try {
        debugger;
        const res = await axios.post(`http://localhost:3333/request/addRequest`, request);
        let tempList = await res.data;
        console.log(tempList)
        return tempList;
    } catch (error) { console.log(error); }
}

class Store {
    currentRequest: any = null;
    request: RequestToMarker[] = [];
    constructor() {
        makeAutoObservable(this);
    } 
    async addRequest(request:RequestToMarker) {
         const RequestAdded= await addRequest(request)
         this.request.push(RequestAdded);
         this.currentRequest = RequestAdded;
        // // this.currentMarker=null
        // //request function
    }
}

const requestStore = new Store();
export default requestStore;