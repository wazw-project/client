import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Manager } from '../utils/manager';

const getManagersByUserIdAndSystemId = async (user_id: string, system_id: string) => {
    debugger
    try {
        debugger
        const res = await axios.get(`http://localhost:3333/managers/${user_id}/${system_id}`);
        // const res = await axios.get(`https://waze-project-360208.el.r.appspot.com/managers/${user_id}/${system_id}`);
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
const addManager = async (manager: Manager) => {
    debugger
    try {
        const res = await axios.post(`http://localhost:3333/managers/addManagers`, manager);
        //const res = await axios.post(`https://waze-project-360208.el.r.appspot.com/managers/addManagers`, manager);

        let tempList = await res.data;
        if (tempList !== "")
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
    async addManager(manager: Manager) {
        debugger;
        await addManager(manager);
    }
    async getManagersByUserIdAndSystemId(user_id: string, system_id: string) {
        debugger
        console.log("user_id", user_id)
        console.log("system_id", system_id)
        debugger
        this.currentManager = await getManagersByUserIdAndSystemId(user_id, system_id)
        debugger
        debugger
        debugger
        console.log( this.currentManager)
        debugger

    }
}
const ManagerStore = new Store();
export default ManagerStore