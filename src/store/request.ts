
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import {RequestToMarker} from '../utils/request'
import systemStore from './systemStore';


const addRequest = async (request:RequestToMarker) => {
    try {
        debugger;
        const res = await axios.post(`http://localhost:3333/request/addRequest`, request);
        let tempList = await res.data;
        console.log(tempList)
        return tempList;
    } catch (error) { console.log(error); }
}
const getRequestForSystem = async (id:string) => {
    try {
        debugger;
        const res = await axios.get(`http://localhost:3333/request/getBySystemId/${id}`);
        let tempList = await res.data;
        console.log(tempList)
        return tempList;
    } catch (error) { console.log(error); }
}
const removeRequest = async (id:string) => {
    try {
        debugger;
        const res = await axios.delete(`http://localhost:3333/request/${id}`);
        let tempList = await res.data;
        console.log(tempList)
        return tempList;
    } catch (error) { console.log(error); }
}
const getRequestById = async (id:string) => {
   try {
        debugger;
        const res = await axios.get(`http://localhost:3333/request/${id}`);
        let tempList = await res.data;
        console.log(tempList)
        return tempList;
    } catch (error) { console.log(error); } 
}
class Store {
    currentRequest: any = null;
    currentRequestAddressesName: string = "";
    request: RequestToMarker[] = [];
    constructor() {
        makeAutoObservable(this);
    } 
    async addRequest(request:RequestToMarker) {
         const RequestAdded= await addRequest(request)
         this.request.push(RequestAdded);
         this.currentRequest = RequestAdded;
    }
    async getRequestForSystem(id: string) {
        this.request= await getRequestForSystem(id)  
        return this.request  
   }
   async getRequestById(id: string) {
    this.currentRequest= await getRequestById(id)      
}
async removeRequest(id: string) {
    debugger;
    this.currentRequest= await removeRequest(id)  
    this.request = this.request.filter((r) => (r._id !== id))
    this.currentRequest=null
  //getRequestForSystem(this.currentRequest.system_id)
}
}

const requestStore = new Store();
export default requestStore;