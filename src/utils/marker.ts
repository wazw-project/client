
export interface Marker{
    manager_id?:string;
    system_id:string;
    location:{
        lat:number,
        lng:number,
        name:string 
        color?:string
    };
    description:string;
    name:string;
    notes:string;
    phone?:string;
    email?:string;
}