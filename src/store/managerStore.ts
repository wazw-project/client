import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Manager } from '../utils/manager';

const getManagersByUserIdAndSystemId=async(user_id:string,system_id:string)=>{
    debugger
    try {
debugger
        const res = await axios.get(`http://localhost:3333/managers/${user_id}/${system_id}`);
        debugger
        let tempList = await res.data;
        // ManagerStore.currentManager=tempList
        debugger
        console.log(tempList)
        debugger
        return tempList;
    }
    catch (error) { console.log(error); }
}
const addManager=async(manager:Manager)=>{
    debugger
    try {
        const res = await axios.post(`http://localhost:3333/managers/addManagers`,manager);
        let tempList = await res.data;
        if(tempList!=="")
          return tempList;
        throw new Error(`Could not add manager`)
    }
    catch (error) { console.log(error); }
}
class Store {

    currentManager: any = null;
    constructor() {
        makeAutoObservable(this);
    }
    async addManager(manager:Manager) {
        debugger;
        await addManager(manager);
    }
    async getManagersByUserIdAndSystemId(user_id:string,system_id:string) {
        debugger
       
        this.currentManager =await getManagersByUserIdAndSystemId(user_id,system_id)
      debugger
      
    }

}
const ManagerStore = new Store();
export default ManagerStore