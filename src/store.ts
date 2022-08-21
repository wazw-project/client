import { User } from './utils/user';
import { System } from './utils/system';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { async } from '@firebase/util';

// const addSystem = (systems:System[],system:System):System[] =>[
//     ...systems,system
// ]

// const addSystemToDb=async(system:System)=>{
//     try {     
//         const res = await axios.post(`http://localhost:3333/system/addSystem`,system);
//         console.log(res.data);
//     } catch (error) { console.log(error); }
// }


   

class Store{
    user: any=null;
    systems:System[]=[];

    // addSystem(system: System){
    //     debugger
    //     // this.systems.push(system);
    //     this.systems=addSystem(this.systems,system);
    //     addSystemToDb(system);
    // }

    async loadSystems(){
        try {
            const managerId='62f4bec1c9f7408b6d78e779';
            const res = await axios.get(`http://localhost:3333/system/${managerId}`);
            let tempList = await res.data;
            return tempList;
        } catch (error) { console.log(error); }
    }

    constructor(){
        makeAutoObservable(this);
    }
}

const store = new Store();
export default store;