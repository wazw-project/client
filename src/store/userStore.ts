import { User } from '../utils/user';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const addUser=async(userToDb:User)=>{
    try {
        debugger
        const res = await axios.post(`http://localhost:3333/user/addUser`, userToDb);
        let tempList = await res.data;
        console.log(tempList)
        return tempList;
      } catch (error) { console.log(error); }
}


const getUser=async(id:string)=>{
    try{
        debugger
       const res = await axios.get(`http://localhost:3333/user/${id}`);   
       let tempList = await res.data;
       return tempList;
    }catch(error) { console.log(error); }
}

class Store {
    user: any = null;
    userFromFireBase: any = null;
    token:string="";
    loginFrom="/"
    constructor() {
        makeAutoObservable(this);
    } 
    async addUser(user:User|any){
        debugger
        await addUser(user);
        this.user=user;
        console.log(this.user)
    }
    async onRefresh(user:User|any){
        await addUser(user);
        this.user=user;
    }
 

    async getUser(id:string){
        debugger
        debugger;
       const user= await getUser(id);
       this.user=user;
       console.log(this.user)
       debugger
      return user
    }   
}

const userStore = new Store();
export default userStore;