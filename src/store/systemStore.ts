import { System } from '../utils/system';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import userStore from './userStore';
import { workerData } from 'worker_threads';



const addSystem = async (system: System, token: string) => {
    debugger;
    try {
        const res = await axios.post(`http://localhost:3333/system/addSystem`, system);
        // {
        //     headers: {"Authorization": token },
        //     body:
        // });
        const data = await res.data;
        console.log(data);
        return data;
    } catch (error) { console.log(error); }
}

const getSystems = async (managerId: string) => {
    try {
        debugger
        const res = await axios.get(`http://localhost:3333/system/${managerId}`)
        // {
        //     headers: {"Authorization": token },
        // });
        let tempList = await res.data;
        return tempList;
    } catch (error) { console.log(error); }
}

const getAllSystems = async () => {
    debugger
    try {
        const res = await axios.get(`http://localhost:3333/system`)
        let tempList = await res.data;
        console.log(tempList);
        return tempList;
    } catch (error) { console.log(error); }
}

const removeSystem = async (systemId: string, token: string) => {
    try {
        await axios.delete(` http://localhost:3333/system/${systemId}`,
            {
                headers: { "Authorization": token },
            });
    } catch (error) { console.log(error); }
}

const editSystem = async (managerId: string, system: System, token: string) => {
    try {
        const res = await axios.put(` http://localhost:3333/system/${managerId}`, system)

        const data = await res.data;
        console.log(data);
    } catch (error) { console.log(error); }
}

const getSystemById = async (id: string) => {
    try {
        debugger
        const res = await axios.get(` http://localhost:3333/system/systemById/${id}`)
        debugger
        const data = await res.data;
        console.log(data)
        return data;
    } catch (err) {
        console.log(err)
    }
}


class Store {
    systems: System[] = [];
    currentSystem: any = null;
    token: string = "";
    allSystems: System[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async loadSystems() {
        debugger
        this.systems = await getSystems(userStore.user._id);
    }

    async getAllSystems() {
        console.log(this.allSystems);
        this.allSystems = await getAllSystems();
        console.log(this.allSystems);
    }

    async addSystem(system: System) {
        debugger;
        const systemFromDB = await addSystem(system, this.token);
        this.systems.push(system);
        return systemFromDB;
    }


    async removeSystem() {
        await removeSystem(this.currentSystem._id, this.token);
        this.currentSystem = null;
    }

    async editSystem(system: System) {
        await editSystem(this.currentSystem._id, system, this.token);
        this.currentSystem = system;
    }

    async getSystemById(id: string) {
        debugger;
        this.currentSystem = await getSystemById(id);
        console.log(this.currentSystem._id)
        debugger

    }

    async SearchSystem(objectName: string | undefined) {
        if (objectName !== "") {
            this.currentSystem = this.allSystems.find((m) => (m.objectName === objectName))
        }
    }
}

const systemStore = new Store();
export default systemStore;