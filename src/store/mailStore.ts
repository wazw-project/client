import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const sendMailToUser = async (userMail:string) => {
    debugger
    try {
        const res = await axios.post(`http://localhost:3333/mail/?email=${userMail}`);
        let tempList = await res.data;
        if (tempList !== "")
            return tempList;
        throw new Error(`Could not  send email`)
    }
    catch (error) { console.log(error); }
}
const sendEmailConfirm = async (userMail:string,userName:string) => {
    debugger
    console.log(userName)
    try {
        const res = await axios.post(`http://localhost:3333/mail/confirm/?email=${userMail}`,{userName});
        let tempList = await res.data;
        if (tempList !== "")
            return tempList;
        throw new Error(`Could not  send email`)
    }
    catch (error) { console.log(error); }
}
const sendEmailManager = async (managerMail:string,mail:any) => {

    debugger
    try {
        const res = await axios.post(`http://localhost:3333/mail/manager/?email=${managerMail}`,mail);
        let tempList = await res.data;
        if (tempList !== "")
            return tempList;
        throw new Error(`Could not  send email`)
    }
    catch (error) { console.log(error); }
}
class Store {

    currentManager: any = null;
    constructor() {
        makeAutoObservable(this);
    }
    async sendMailToUser(userMail:string) {
        debugger;
        await sendMailToUser(userMail);
    }
    async sendEmailConfirm(userMail:string,userName:string) {
        debugger;
        await sendEmailConfirm(userMail,userName);
    }
    async sendEmailManager(managerMail:string,userName:string,systemName:string,urlName:string,systemId:string) {
        debugger;
        const mail: any = {
            "userName": userName,
            "systemName": systemName,
            "urlName": urlName,
            "systemId": systemId,
        
        }
        await sendEmailManager(managerMail,mail);
    }
}
const MailStore = new Store();
export default MailStore