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
class Store {

    currentManager: any = null;
    constructor() {
        makeAutoObservable(this);
    }
    async sendMailToUser(userMail:string) {
        debugger;
        await sendMailToUser(userMail);
    }

}
const MailStore = new Store();
export default MailStore