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

const getSystems=async(managerId:string)=>{
    try {
       // const managerId='62f4bec1c9f7408b6d78e779';
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
const getUser=async(id:string)=>{
    debugger
    try{
       const res = await axios.get(`http://localhost:3333/user/${id}`);   
       let tempList = await res.data;
       return tempList;
    }catch(error) { console.log(error); }
}
   

class Store{
    user:any=[];
    systems:System[]=[];

    async loadSystems(){
        debugger;
        this.systems = await getSystems(this.user._id);
    }

    async addSystem(system:System){
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

    constructor(){
        makeAutoObservable(this);
    }
}

const store = new Store();

export default store ;