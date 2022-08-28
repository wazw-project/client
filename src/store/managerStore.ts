import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Manager } from '../utils/manager';

const addManager=async(manager:Manager)=>{
    try {
        const res = await axios.post(`http://localhost:3333/managers/addManagers`,manager);
        let tempList = await res.data;
        return tempList;
    }
    catch (error) { console.log(error); }
}
class Store {

    currentManager: any = null;
    constructor() {
        makeAutoObservable(this);
    }
    async addManager(manager:Manager) {
        await addManager(manager);
    }

}
const ManagerStore = new Store();
export default ManagerStore