import { User } from './utils/user';
import { System } from './utils/system';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const addUser=async(userToDb:User)=>{
    try {
        const res = await axios.post(`http://localhost:3333/user/addUser`, userToDb);
        let tempList = await res.data;
        return tempList;
      } catch (error) { console.log(error); }
}

const getUser=async(id:string)=>{
    debugger
    try{
       const res = await axios.get(`http://localhost:3333/user/${id}`);   
       let tempList = await res.data;
       return tempList;
    }catch(error) { console.log(error); }
}

const addSystem = async (system: System) => {
    try {
        const res = await axios.post(`http://localhost:3333/system/addSystem`, system);
        const data = await res.data;
        console.log(data);
        return data;
    } catch (error) { console.log(error); }
}

const getSystems = async () => {
    try {
        const managerId = '62f4bec1c9f7408b6d78e779';
        const res = await axios.get(`http://localhost:3333/system/${managerId}`);
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
    try {
        const res = await axios.put(` http://localhost:3333/system/${managerId}`, system)
        console.log(res.data)
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
    user: any = null;
    systems: System[] = [];
    // currentSystem
    
    constructor() {
        makeAutoObservable(this);
    }

    async loadSystems() {
        this.systems = await getSystems();
    }

    async addSystem(system: System) {
        await addSystem(system);
        this.systems.push(system);
        console.log(this.systems)
    }
    async addUser(user:User){
        debugger
        await addUser(user);
        debugger;
        this.user=user;
        console.log(this.user)
    }
    async getUser(id:string){
        debugger;
        debugger
       const user= await getUser(id);
        debugger;
        this.user=user;
        console.log(user)
      return user
      
    }

    async removeSystem(systemId: string) {
        await removeSystem(systemId);
        this.systems = this.systems.filter(system => system._id !== systemId);
    }

    async editSystem(managerId: string, system: System) {
        await editSystem(managerId, system);
        // this.systems=this.systems.filter(s=>s._id === system._id?s==system:s);
    }

    async getSystemById(Id: string) {
        const system = await getSystemById(Id);

    }
}

const store = new Store();

export default store ;