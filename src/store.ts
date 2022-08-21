import { User } from './utils/user';
import { System } from './utils/system';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';



const addSystem=async(system:System)=>{
    try {     
        const res = await axios.post(`http://localhost:3333/system/addSystem`,system);
        const data = await res.data;
        console.log(data);
        return data;
    } catch (error) { console.log(error); }
}

const getSystems=async()=>{
    try {
        const managerId='62f4bec1c9f7408b6d78e779';
        const res = await axios.get(`http://localhost:3333/system/${managerId}`);
        let tempList = await res.data;
        return tempList;
    } catch (error) { console.log(error); }
}
const addUser=async(userToDb:User)=>{
    try {
        const res = await axios.post(`http://localhost:3333/user/addUser`, userToDb);
        let tempList = await res.data;
        return tempList;
      } catch (error) { console.log(error); }
}
   

class Store{
    user:any=[];
    systems:System[]=[];

    async loadSystems(){
        this.systems = await getSystems();
    }

    async addSystem(system:System){
        await addSystem(system);
        this.systems.push(system);
        console.log(this.systems)
    }
    async addUser(user:User){
        await addUser(user);
        this.user=user;
        console.log(this.user)
    }

    constructor(){
        makeAutoObservable(this);
    }
}

const store = new Store();

export default store ;