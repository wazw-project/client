import { User } from '../utils/user';
import { System } from '../utils/system';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import userStore from './userStore';



const addSystem = async (system: System) => {
    try {
        const res = await axios.post(`http://localhost:3333/system/addSystem`, system);
        const data = await res.data;
        console.log(data);
        return data;
    } catch (error) { console.log(error); }
}

const getSystems = async (managerId:string,token:string) => {
    try {   
        const res = await axios.get(`http://localhost:3333/system/${managerId}`, 
        {
            headers: {"Authorization": token },
        });
        let tempList = await res.data;
        return tempList;
    } catch (error) { console.log(error); }
}

const removeSystem = async (systemId: string) => {
    try {
        await axios.delete(` http://localhost:3333/system/${systemId}`)
    } catch (error) { console.log(error); }
}

const editSystem = async (managerId: string, system: System) => {
    debugger
    try {
        const res = await axios.put(` http://localhost:3333/system/${managerId}`, system)
        const data = await res.data;
        console.log(data);
    } catch (error) { console.log(error); }
}

const getSystemById = async (id: string) => {
    try {
        const res = await axios.get(` http://localhost:3333/system/systemById/${id}`)
        const data = await res.data;
        return data;
    } catch (err) {
        console.log(err)
    }
}


class Store {
   
    systems: System[] = [];
    currentSystem: any = null;
    token:string="";

    constructor() {
        makeAutoObservable(this);
    }

    async loadSystems() {
        this.systems = await getSystems(userStore.user._id,this.token);
    }

    async addSystem(system: System) {
        await addSystem(system);
        this.systems.push(system);
        console.log(this.systems)
    }
   

    async removeSystem() {
        await removeSystem(this.currentSystem._id);
        this.currentSystem=null;
    }

    async editSystem(system: System) {
        debugger
        await editSystem(this.currentSystem._id, system);
        this.currentSystem=system;
    }

    async getSystemById(id: string) {
        this.currentSystem = await getSystemById(id);
    }
}

const systemStore = new Store();
export default systemStore;